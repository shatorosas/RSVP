const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const { Path } = require("path-parser");
const { URL } = require("url");

const Contact = mongoose.model("contacts");

module.exports = app => {
  app.get("/api/contacts", requireLogin, async (req, res) => {
    const contacts = await Contact.find({ _user: req.user.id }).select();
    res.send(contacts);
  });

  app.get("/api/contactsLight", requireLogin, async (req, res) => {
    const contacts = await Contact.find({ _user: req.user.id }).select(
      "-avatar"
    );
    res.send(contacts);
  });

  app.get("/api/contacts/:contactId", requireLogin, async (req, res) => {
    const p = new Path("/api/contacts/:contactId");

    const match = p.test(new URL(req.body.url).pathname);

    const contacts = await RSVP.find({ _id: match.contactId }).select();
    res.send(contacts);
  });

  app.post("/api/contacts", requireLogin, async (req, res) => {
    const { firstName, lastName, avatar, email } = req.body;

    const contact = new Contact({
      firstName,
      lastName,
      avatar,
      email,
      _user: req.user.id
    });

    const newContact = await contact.save();
    res.send(newContact);
  });

  app.put("/api/contacts", requireLogin, async (req, res) => {
    const { firstName, lastName, avatar, email, _id } = req.body;

    const contact = await Contact.findOneAndUpdate(
      {
        _id: _id
      },
      {
        $set: {
          firstName: firstName,
          lastName: lastName,
          avatar: avatar,
          email: email
        }
      },
      {
        new: true
      }
    ).exec();

    res.send(contact);
  });
};
