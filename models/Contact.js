const mongoose = require("mongoose");

const { Schema } = mongoose;

const contactSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  avatar: String,
  _user: { type: Schema.Types.ObjectId, ref: "User" }
});

mongoose.model("contacts", contactSchema);
