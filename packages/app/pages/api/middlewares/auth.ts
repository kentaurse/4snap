import ENV from "../config/env";
import Passage from "@passageidentity/passage-node";
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import jwt from "jsonwebtoken";
import { SettingsModel, UserModel } from "../model";
import { isEmpty } from "../../../util";
import dbConnect from "../config/mongodb";

let passage = new Passage({
  appID: process.env.PASSAGE_APP_ID,
  apiKey: ENV.passageApiKey,
  authStrategy: "HEADER",
});

export function isLoggedIn(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const token =
        req.headers["psg_auth_token"] ?? req.cookies["psg_auth_token"];

      if (isEmpty(token)) {
        return res.status(401).json({
          errorStatus: true,
          code: "--auth/authorization-token-notfound",
          message: `Authorization header expected a token but got none.`,
        });
      }

      const passageReq = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      let userID = await passage.authenticateRequest(passageReq);
      if (isEmpty(userID) === true) {
        return res.status(401).json({
          errorStatus: true,
          code: "--auth/unauthorised",
          message: `Unauthorised user.`,
        });
      }
      req["userId"] = userID;
      await handler(req, res);
    } catch (e: any) {
      console.log(e);
      console.error(`invalid qwik token: ${e?.message}`);
      return res.status(401).json({
        errorStatus: true,
        code: "--auth/invalid-token",
        error: e,
        message: `Authorization token is invalid.`,
      });
    }
  };
}

// export function passageAuthMiddleware(handler: NextApiHandler) {
//   return async (req: NextApiRequest, res: NextApiResponse) => {
//     try {
//       let userID = await passage.authenticateRequest(req);
//       if (isEmpty(userID) === true) {
//         return res.status(401).json({
//           errorStatus: true,
//           code: "--auth/unauthorised",
//           message: `Unauthorised user.`,
//         });
//       }
//       req["userId"] = userID;

//       await handler(req, res);
//     } catch (e: any) {
//       console.error(`invalid passage token: ${e?.message}`);
//       return res.status(401).json({
//         errorStatus: true,
//         code: "--auth/invalid-token",
//         error: e,
//         message: `Passage Authorization token is invalid.`,
//       });
//     }
//   };
// }

export function isCliUserLoggedIn(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    await dbConnect();
    try {
      const token = req.headers["x-qwik-token"];

      if (!token || typeof token === "undefined") {
        return res.status(401).json({
          errorStatus: true,
          code: "--auth/authorization-token-notfound",
          message: `Authorization header expected a token but got none.`,
        });
      }

      //   check if user exists
      const qwikTokenExists = await SettingsModel.findOne({ token });

      if (qwikTokenExists === null) {
        res.status(404).json({
          errorStatus: true,
          code: "--auth/invalid-token",
          message: "failed to perform action, account doesn't exists.",
        });
        return;
      }

      const uId = qwikTokenExists.userId;
      const account = await UserModel.findOne({ uId });

      req["user"] = account;
      await handler(req, res);
    } catch (e: any) {
      console.error(`invalid qwik token: ${e?.message}`);
      return res.status(401).json({
        errorStatus: true,
        code: "--auth/invalid-token",
        error: e,
        message: `Authorization token is invalid.`,
      });
    }
  };
}
