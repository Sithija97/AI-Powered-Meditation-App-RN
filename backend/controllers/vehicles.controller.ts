import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import Vehicle from "../models/vehicle.model.js";
import { CustomRequest } from "../interfaces/common.js";

/*
~ POST   : /api/vehicles      - [private] - register a vehicle
~ GET    : /api/vehicles/:id  - [private] - get vehicle
~ GET    : /api/vehicles      - [private] - get vehicles by user
~ GET    : /api/vehicles/all  - [private] - get all vehicles
~ PUT    : /api/vehicles/:id  - [private] - update vehicle
~ DELETE : /api/vehicles/:id  - [private] - delete vehicle
*/

export const registerVehicle = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const {
      ownership,
      type,
      chassieNumber,
      fuelType,
      revenueLicenceDetails,
      insuaranceDetails,
      smokeTestDetails,
      portPermitDetails,
      leasingDetails,
    } = req.body;
    const vehicleExists = await Vehicle.findOne({ chassieNumber });

    if (vehicleExists) {
      res.status(400);
      throw new Error("Vehicle already exists");
    }

    const vehicle = await Vehicle.create({
      user: req.user._id,
      ownership,
      type,
      chassieNumber,
      fuelType,
      revenueLicenceDetails,
      insuaranceDetails,
      smokeTestDetails,
      portPermitDetails,
      leasingDetails,
    });

    if (vehicle) {
      res.status(201).json(vehicle);
    } else {
      res.status(400);
      throw new Error("Invalid vehicle data");
    }
  }
);

export const getVehicle = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const vehicle = await Vehicle.findById(req.params.id)
      .lean()
      .select("-createdAt -updatedAt -__v");

    if (!vehicle) {
      res.status(400);
      throw new Error("Goal not found");
    }

    if (vehicle.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("User not authorized");
    }

    res.status(200).json(vehicle);
  }
);

export const getVehicles = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const vehicles = await Vehicle.find({ user: req.user._id })
      .lean()
      .select("-createdAt -updatedAt -__v");
    res.status(200).json(vehicles);
  }
);

export const getAllVehicles = asyncHandler(
  async (req: Request, res: Response) => {
    const vehicles = await Vehicle.find()
      .lean()
      .select("-createdAt -updatedAt -__v");
    res.status(200).json(vehicles);
  }
);

export const updateVehicle = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      res.status(400);
      throw new Error("Goal not found");
    }

    if (vehicle.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("User not authorized");
    }

    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(updatedVehicle);
  }
);

export const deleteVehicle = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      res.status(400);
      throw new Error("Goal not found");
    }

    if (vehicle.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("User not authorized");
    }

    const removedVehicle = await Vehicle.findByIdAndRemove(req.params.id);

    res.status(200).json({ id: req.params.id });
  }
);
