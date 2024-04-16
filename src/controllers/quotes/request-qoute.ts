import { Request, Response } from "express";
import { IMotor, INonMotor } from "../../types/request-quote";

class QuotesController {
  async requestMotorQuote(req: IMotor, res: Response) {
    try {
      const { model, reqNumber, value, use, yearOfManufacture } = req;

      const premium = value * 3.4;
      const stamp_duty = 40;
      const trainning_levy = premium * 0.2;
      const PHCfund = value * 0.25;

      const response = [
        {
          model,
          reqNumber,
          use,
          yearOfManufacture,
          premium,
          stamp_duty,
          trainning_levy,
          PHCfund,
        },
      ];

      return res.status(200).json({ response: response });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }
  async requestNonMotorQuote(req: INonMotor, res: Response) {
    try {
      const { address, city, products, purpose } = req;
      return res.status(200).json({ message: "This is non-motor quote" });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }
}

const quoteController = new QuotesController();
export default quoteController;
