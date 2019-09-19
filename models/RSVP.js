const mongoose = require("mongoose");
const { Schema } = mongoose;
const RecipientSchema = require("./Recipient");

const rsvpSchema = new Schema({
  userId: String,
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientSchema],
  emails: String,
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  dateSent: Date,
  lastResponded: Date,
  status: { type: Number, default: 0 },
  totalRecipients: { type: Number, default: 0 }
});

mongoose.model("rsvps", rsvpSchema);
