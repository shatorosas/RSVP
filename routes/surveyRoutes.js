const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");
const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");

const Survey = mongoose.model("surveys");

module.exports = app => {
  app.get("/api/surveys", requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select(
      "-recipients"
    );
    res.send(surveys);
  });

  app.get("/api/surveys/:surveyId", requireLogin, async (req, res) => {
    const p = new Path("/api/surveys/:surveyId/:choice");

    const match = p.test(new URL(req.body.url).pathname);

    const surveys = await Survey.find({ _id: match.surveyId }).select(
      "-recipients"
    );
    res.send(surveys);
  });

  app.post("/api/surveys/webhooks", (req, res) => {
    const p = new Path("/api/surveys/:surveyId/:choice");

    const events = _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);

        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact()
      .uniqBy("email", "surveyId")
      .each(({ email, surveyId, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: { $elemMatch: { email: email, responded: false } }
          },
          {
            $inc: { [choice]: 1 },
            $set: { "recipients.$.responded": true },
            lastResponded: new Date()
          }
        ).exec();
      })
      .value();

    res.send({});
  });

  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    res.send("Thanks for voting!");
  });

  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, emails, status } = req.body;
    const recipients = emails
      .split(",")
      .map(email => ({ email: email.trim() }));
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: status === 1 ? recipients : null,
      emails: emails,
      _user: req.user.id,
      dateSent: status === 1 ? Date.now() : null,
      status,
      totalRecipients: recipients.length
    });

    if (status && status == 1) {
      const mailer = new Mailer(survey, surveyTemplate(survey));

      try {
        await mailer.send();
        await survey.save();
        req.user.credits--;
        const user = await req.user.save();

        res.send(user);
      } catch (err) {
        res.status(422).send(err);
      }
    } else {
      await survey.save();
      res.send(req.user);
    }
  });

  app.put("/api/surveys", requireLogin, async (req, res) => {
    const { title, subject, body, emails, status, _id } = req.body;

    const recipients = emails
      .split(",")
      .map(email => ({ email: email.trim() }));

    const survey = await Survey.findOneAndUpdate(
      {
        _id: _id
      },
      {
        $set: {
          title: title,
          subject: subject,
          body: body,
          recipients: status === 1 ? recipients : null,
          emails: emails,
          dateSent: status === 1 ? Date.now() : null,
          status: status,
          totalRecipients: recipients.length
        }
      },
      {
        new: true
      }
    ).exec();

    if (status && status == 1) {
      const mailer = new Mailer(survey, surveyTemplate(survey));

      try {
        await mailer.send();
        req.user.credits--;
        const user = await req.user.save();
        res.send(user);
      } catch (err) {
        res.status(422).send(err);
      }
    } else {
      res.send(req.user);
    }
  });
};
