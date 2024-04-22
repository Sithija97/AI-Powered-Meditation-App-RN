import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import Hire from "../models/hire.model.js";
import { CustomRequest } from "../interfaces/common.js";

export const registerHire = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const {
      hireType,
      vehicle,
      driver,
      date,
      startTime,
      startLocation,
      endTime,
      endLocation,
      distance,
      amount,
    } = req.body;

    const hire = await Hire.create({
      hireType,
      vehicle,
      driver,
      date,
      startTime,
      startLocation,
      endTime,
      endLocation,
      distance,
      amount,
    });

    if (hire) {
      res.status(201).json(hire);
    } else {
      res.status(400);
      throw new Error("Invalid hire data");
    }
  }
);

export const getHire = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const hire = await Hire.findById(req.params.id)
      .lean()
      .select("-createdAt -updatedAt -__v");

    if (!hire) {
      res.status(400);
      throw new Error("Hire not found");
    }

    // Check if the user is authorized to access this hire (optional)
    // if (hire.user.toString() !== req.user._id.toString()) {
    //   res.status(401);
    //   throw new Error("User not authorized");
    // }

    res.status(200).json(hire);
  }
);

export const getHiresByUser = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const hires = await Hire.find({ driver: req.user._id })
      .populate({
        path: "vehicle",
        select: "-__v",
      })
      .populate({
        path: "driver",
        select: "-__v,",
      })
      .lean()
      .select("-createdAt -updatedAt -__v");
    res.status(200).json(hires);
  }
);

export const getAllHires = asyncHandler(async (req: Request, res: Response) => {
  const hires = await Hire.find()
    .populate({
      path: "vehicle",
      select: "-__v",
    })
    .populate({
      path: "driver",
      select: "-__v",
    })
    .lean()
    .select("-createdAt -updatedAt -__v");
  res.status(200).json(hires);
});

export const updateHire = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const hire = await Hire.findById(req.params.id);

    if (!hire) {
      res.status(400);
      throw new Error("Hire not found");
    }

    // Check if the user is authorized to update this hire (optional)
    // if (hire.user.toString() !== req.user._id.toString()) {
    //   res.status(401);
    //   throw new Error("User not authorized");
    // }

    const updatedHire = await Hire.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(updatedHire);
  }
);

export const deleteHire = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const hire = await Hire.findById(req.params.id);

    if (!hire) {
      res.status(400);
      throw new Error("Hire not found");
    }

    // Check if the user is authorized to delete this hire (optional)
    // if (hire.user.toString() !== req.user._id.toString()) {
    //   res.status(401);
    //   throw new Error("User not authorized");
    // }

    await Hire.findByIdAndRemove(req.params.id);

    res.status(200).json({ id: req.params.id });
  }
);
