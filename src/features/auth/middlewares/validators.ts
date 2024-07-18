import { body, query } from "express-validator";
import { inputCheckErrorsMiddleware } from "../../../global-middlewares/inputCheckErrorsMiddleware";
import { userCollection } from "../../../app";
import { authRepository } from "../authRepository";

export const codeParamsValidator = query("code")
  .isString()
  .trim()
  .withMessage("not string")
  .isLength({ min: 1, max: 500 })
  .withMessage("not found");

export const emailConfirmCreateValidators = [
  codeParamsValidator,
  inputCheckErrorsMiddleware,
];

export const loginValidator = body("login")
  .isString()
  .withMessage("not string")
  .trim()
  .isLength({ min: 3, max: 10 })
  .withMessage("more then 30 or 0")
  .custom(async (login) => {
    const user = await authRepository.findByLoginOrEmail(login);
    if (!user) {
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  });

export const passwordValidator = body("password")
  .isString()
  .withMessage("not string")
  .trim()
  .isLength({ min: 6, max: 20 })
  .withMessage("more then 100 or 0");

export const emailValidator = body("email")
  .isString()
  .withMessage("not string")
  .trim()
  .withMessage("not valid email")
  .custom(async (email) => {
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!emailRegex.test(email)) return Promise.reject();
    const user = await authRepository.findByLoginOrEmail(email);
    if (!user) {
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  });

export const codelValidator = body("code")
  .isString()
  .withMessage("not string")
  .trim()
  .withMessage("not valid email")
  .custom(async (code) => {
    console.log(code);
    const user = await userCollection.findOne({
      $and: [
        { "emailConfirmation.confirmationCode": code },
        { "emailConfirmation.isConfirmed": false },
      ],
    });
    console.log(user);
    if (user) {
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  });

export const resendEmailValidator = body("email")
  .isString()
  .withMessage("not string")
  .trim()
  .withMessage("not valid email")
  .custom(async (email) => {
    const user = await userCollection.findOne({
      $and: [{ email }, { "emailConfirmation.isConfirmed": false }],
    });
    console.log(user);
    if (user) {
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  });

export const userCreateValidators = [
  loginValidator,
  passwordValidator,
  emailValidator,
  inputCheckErrorsMiddleware,
];

export const resendEmailValidators = [
  resendEmailValidator,
  inputCheckErrorsMiddleware,
];
