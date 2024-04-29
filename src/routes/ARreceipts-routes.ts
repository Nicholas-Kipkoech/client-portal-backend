import { Router } from "express";
import arReceiptsController from "../controllers/ARreceipts/AR-receipts-controller";

const arReceiptsRouter = Router();

arReceiptsRouter.post("/fetch", (req, res) => {
  arReceiptsController.getARreceipts(req, res);
});
export default arReceiptsRouter;