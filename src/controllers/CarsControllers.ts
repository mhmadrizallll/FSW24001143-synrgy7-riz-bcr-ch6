import { Request, Response } from "express";

class CarsControllers {
  async getCars(req: Request, res: Response) {
    res.status(200).json({ status: true, message: "Cars found" });
  }
}

const carsControllers = new CarsControllers();
export { carsControllers };
