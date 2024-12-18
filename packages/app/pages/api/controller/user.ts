import { NextApiRequest, NextApiResponse } from "next";
import BaseController from "./base";
import { isEmpty } from "../../../util";
import { SettingsModel, UserModel } from "../model";

export default class UserController extends BaseController {
  constructor() {
    super();
  }

  public generateToken(len: number) {
    let password = "";
    const possibleChars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < len; i++) {
      password += possibleChars.charAt(
        Math.floor(Math.random() * possibleChars.length)
      );
    }

    return password;
  }

  async create(req: NextApiRequest, res: NextApiResponse) {
    const userId = req["userId"];
    const payload = req.body;
    console.log(payload);
    if (isEmpty(payload) || Object.entries(payload).length === 0) {
      this.error(res, "--create/invalid-field", "User email not found", 404);
      return;
    }

    const email = payload["email"];

    if (isEmpty(email)) {
      this.error(res, "--create/invalid-field", "User email not found", 404);
      return;
    }

    const emailExists = await UserModel.find({ email });

    if (emailExists.length > 0) {
      this.error(
        res,
        "--create/user-exists",
        "user with this email already exists",
        400
      );
      return;
    }

    // create user account
    const username = email.split("@")[0];
    const collection = {
      uId: userId,
      email,
      username,
    };
    await UserModel.create(collection);

    // create a default token for cli authentication.
    const tokenGenerated = this.generateToken(20);
    await SettingsModel.create({
      userId,
      token: tokenGenerated,
    });

    // send success response
    this.success(res, "--create/success", "user created successfully", 200, {
      ...collection,
      token: tokenGenerated,
    });
  }

  async getUserInfo(req: NextApiRequest, res: NextApiResponse) {
    const userId = req["userId"];
    const userInfo = await UserModel.findOne({ uId: userId });

    this.success(
      res,
      "--getUserInfo/success",
      "user info fetched.",
      200,
      userInfo
    );
  }
}
