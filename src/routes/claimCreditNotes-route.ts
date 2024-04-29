import { Router } from "express";
import claimCreditNotesController from "../controllers/claimCreditNotes/claim-credit-notes-controller";

const claimCreditNotesRouter = Router();

claimCreditNotesRouter.post("/fetch", (req, res) => {
  claimCreditNotesController.getClaimCreditNotes(req, res);
});
export default claimCreditNotesRouter;