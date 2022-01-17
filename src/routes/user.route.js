import { Router } from "express";
const router = Router();

import * as usersCtrl from "../controllers/user.controller";
import { authJwt, verifySignup } from "../middlewares";

router.post(
  "/register",
  [
    //authJwt.verifyToken,   <== nex implementation
    //authJwt.isAdmin,
    verifySignup.checkDuplicateUsernameOrEmail,
  ],
  usersCtrl.createUser
);

router.get(
  "/getUser",
  [
    authJwt.verifyToken
  ],
  usersCtrl.getUser
);

router.post(
  "/updateUser",
  [
    authJwt.verifyToken
  ],
  usersCtrl.updateUser
);

export default router;