import { Request, Response } from "express";
import { carService } from "../services/CarService";
import { v4 } from "uuid";
import cloudinary from "../middleware/cloudinary";

class CarsControllers {
  async getCarsALluser(req: Request, res: Response) {
    try {
      const cars = await carService.getAllCars();
      res.status(200).json({
        status: true,
        message: "Cars Available",
        data: cars,
      });
    } catch (err) {
      res.status(500).json({ status: false, message: err });
    }
  }
  async getCars(req: Request, res: Response) {
    const role = req.user?.role;
    console.log("ini adalah user", role);
    try {
      let cars;
      if (role === "superadmin" || role === "admin") {
        cars = await carService.getAllCars();
        res.status(200).json({
          status: true,
          message: "Cars Available",
          data: cars,
        });
      } else {
        cars = await carService.getCarIsDeletedFalse();
        res.status(200).json({
          status: true,
          message: "Cars Available",
          data: cars,
        });
      }
    } catch (err) {
      res.status(500).json({ status: false, message: err });
    }
  }

  async getCarById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const car = await carService.getCarById(id);
      if (car) {
        res.status(200).json({
          status: true,
          message: "Car Available",
          data: car,
        });
      } else {
        res.status(404).json({
          status: false,
          message: "Car not found",
        });
      }
    } catch (err) {
      res.status(500).json({ status: false, message: err });
    }
  }

  async cloudUploadImage(req: Request, res: Response) {
    const fileBase64 = req.file?.buffer.toString("base64");
    const file = `data:${req.file?.mimetype};base64,${fileBase64}`;

    cloudinary.uploader
      .upload(file)
      .then((result) => {
        res.status(200).json({
          status: true,
          message: "File uploaded",
          data: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          status: false,
          message: err,
        });
      });
  }

  async create(req: Request, res: Response) {
    const { merk, type, year, status } = req.body;
    const user: any = req.user;
    const role = req.user?.role;
    console.log("ini adalah user", user);
    try {
      if (!req.file) {
        return res.status(400).json({
          status: false,
          message: "Image is required",
        });
      }

      const fileBase64 = req.file.buffer.toString("base64");
      const file = `data:${req.file.mimetype};base64,${fileBase64}`;

      if (!merk || !type || !year) {
        return res.status(400).json({
          status: false,
          message: "All fields are required",
        });
      }

      if (role !== "superadmin" && role !== "admin") {
        return res.status(401).json({
          status: false,
          message: "Access forbidden",
        });
      }
      const uploadResult = await cloudinary.uploader.upload(file);
      const payload = {
        id: v4(),
        merk,
        type,
        year,
        status,
        image: uploadResult.secure_url,
        created_by: user.username,
      };
      const car = await carService.createCar(payload);
      res.status(201).json({
        status: true,
        message: "Car created",
        data: payload,
      });
    } catch (err) {
      res.status(500).json({ status: false, message: err });
    }
  }

  async update(req: Request, res: Response) {
    const { merk, type, year, status } = req.body;
    const { id } = req.params;
    const user: any = req.user;
    const role = req.user?.role;
    try {
      if (!merk || !type || !year) {
        return res.status(400).json({
          status: false,
          message: "All fields are required",
        });
      }

      if (role !== "superadmin" && role !== "admin") {
        return res.status(401).json({
          status: false,
          message: "Access forbidden",
        });
      }

      const payload: any = {
        merk,
        type,
        year,
        status,
        updated_by: user.username,
        updated_at: new Date(),
      };

      if (req.file) {
        const fileBase64 = req.file.buffer.toString("base64");
        const file = `data:${req.file.mimetype};base64,${fileBase64}`;
        const uploadResult = await cloudinary.uploader.upload(file);
        payload.image = uploadResult.secure_url;
      }

      const car = await carService.updateCar(id, payload);
      res.status(200).json({
        status: true,
        message: "Car updated",
        data: {
          id: car.id,
          merk: car.merk,
          type: car.type,
          year: car.year,
          status: car.status,
          image: car.image,
          updated_by: car.updated_by,
        },
      });
    } catch (err) {
      res.status(500).json({ status: false, message: err });
    }
  }

  async softDelete(req: Request, res: Response) {
    const { id } = req.params;
    const user: any = req.user;
    const role = req.user?.role;

    try {
      const car: any = await carService.softDeleteCar(id, user.username);
      if (role !== "superadmin" && role !== "admin") {
        return res.status(401).json({
          status: false,
          message: "Access forbidden",
        });
      }
      if (car) {
        res.status(200).json({
          status: true,
          message: "Car deleted",
          data: {
            id: car.id,
            merk: car.merk,
            type: car.type,
            year: car.year,
            status: car.status,
            is_deleted: car.is_deleted,
          },
        });
      } else {
        res.status(404).json({
          status: false,
          message: "Car not found or already deleted",
        });
      }
    } catch (err) {
      res.status(500).json({ status: false, message: err });
    }
  }

  async restore(req: Request, res: Response) {
    const { id } = req.params;
    const user: any = req.user;
    const role = req.user?.role;
    try {
      const car = await carService.restoreCar(id, user.username);
      if (role !== "superadmin" && role !== "admin") {
        return res.status(401).json({
          status: false,
          message: "Access forbidden",
        });
      }
      if (car) {
        res.status(200).json({
          status: true,
          message: "Car restored",
          data: {
            id: car.id,
            merk: car.merk,
            type: car.type,
            year: car.year,
            status: car.status,
            restored_by: car.restored_by,
          },
        });
      } else {
        res.status(404).json({
          status: false,
          message: "Car not found or already restored",
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ status: false, message: err });
    }
  }
}

const carsControllers = new CarsControllers();
export { carsControllers };
