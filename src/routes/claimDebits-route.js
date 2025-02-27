import { Router } from "express";
import claimDebitsController from "../controllers/claimDebits/claim-debits-controller.js";

const claimDebitsRouter = Router();

claimDebitsRouter.post("/fetch", (req, res) => {
  claimDebitsController.getClaimDebits(req, res);
});
export default claimDebitsRouter;
