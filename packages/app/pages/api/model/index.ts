import { string } from "joi";
import mongoose from "mongoose";
import { Schema, model, Document } from "mongoose";

const userSchema = new Schema({
  uId: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
});

export const UserModel = mongoose.models["User"] || model("User", userSchema);

const settingsSchema = new Schema({
  userId: { type: String, required: true },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const SettingsModel =
  mongoose.models["Settings"] || model("Settings", settingsSchema);

const commandsSchema = new Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  command: { type: String, required: true },
  public: { type: Boolean, default: false },
});

export const CommandsModel =
  mongoose.models["Commands"] || model("Commands", commandsSchema);
