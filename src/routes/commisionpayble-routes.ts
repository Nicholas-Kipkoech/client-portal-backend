import { Router } from "express";
import commisionPayableController from "../controllers/commissionPayable/commission-payable-controller";

const commissionPaybleRouter = Router();

commissionPaybleRouter.post("/fetch", (req, res) => {
  commisionPayableController.getCommissionPayble(req, res);
});
export default commissionPaybleRouter;