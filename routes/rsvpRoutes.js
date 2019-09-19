const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const rsvpTemplate = require("../services/emailTemplates/rsvpTemplate");
const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");

const RSVP = mongoose.model("rsvps");

module.exports = app => {
  app.get("/api/rsvps", requireLogin, async (req, res) => {
    const rsvps = await RSVP.find({ _user: req.user.id }).select(
      "-recipients"
    );
    res.send(rsvps);
  });

  app.get("/api/rsvps/:rsvpId", requireLogin, async (req, res) => {
    const p = new Path("/api/rsvps/:rsvpId/:choice");

    const match = p.test(new URL(req.body.url).pathname);

    const rsvps = await RSVP.find({ _id: match.rsvpId }).select(
      "-recipients"
    );
    res.send(rsvps);
  });

  app.post("/api/rsvps/webhooks", (req, res) => {
    const p = new Path("/api/rsvps/:rsvpId/:choice");

    const events = _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);

        if (match) {
          return { email, rsvpId: match.rsvpId, choice: match.choice };
        }
      })
      .compact()
      .uniqBy("email", "rsvpId")
      .each(({ email, rsvpId, choice }) => {
        RSVP.updateOne(
          {
            _id: rsvpId,
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

  app.get("/api/rsvps/:rsvpId/:choice", (req, res) => {
    res.send("Thanks for voting!");
  });

  app.post("/api/rsvps", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, emails, status } = req.body;
    const recipients = emails
      .split(",")
      .map(email => ({ email: email.trim() }));
    const rsvp = new RSVP({
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
      const mailer = new Mailer(rsvp, rsvpTemplate(rsvp));

      try {
        await mailer.send();
        await rsvp.save();
        req.user.credits--;
        const user = await req.user.save();

        res.send(user);
      } catch (err) {
        res.status(422).send(err);
      }
    } else {
      await rsvp.save();
      res.send(req.user);
    }
  });

  app.put("/api/rsvps", requireLogin, async (req, res) => {
    const { title, subject, body, emails, status, _id } = req.body;

    const recipients = emails
      .split(",")
      .map(email => ({ email: email.trim() }));

    const rsvp = await RSVP.findOneAndUpdate(
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
      const mailer = new Mailer(rsvp, rsvpTemplate(rsvp));

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
