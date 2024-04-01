import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";
import { CustomRequest } from "../interfaces/index.js";

/*
~ POST    : /api/users          - [public]  - register a user
~ POST    : /api/users/auth     - [public]  - authenticate a user and get token
~ POST    : /api/users/logout   - [public]  - logout user and clear cookie
~ GET     : /api/users/profile  - [private] - get user profile
~ PUT     : /api/users/profile  - [private] - update user profile
~ GET     : /api/users/all      - [private] - get all registered users 
~ DELETE  : /api/users/:id      - [private] - delete user
~ PUT     : /api/users/:id      - [private] - update user
*/

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, nic, password, role, email } = req.body;
    const userExists = await User.findOne({ nic });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await User.create({
      name,
      nic,
      password,
      role,
      email,
    });

    if (user) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        nic: user.nic,
        title: user.title,
        role: user.role,
        maritalStatus: user.maritalStatus,
        email: user.email,
        address: user.address,
        dob: user.dob,
        gender: user.gender,
        profileImgUrl: user.profileImgUrl,
        nicDetails: user.nicDetails,
        policeReportsDetails: user.policeReportsDetails,
        drivingLicenceDetails: user.drivingLicenceDetails,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }
);

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { nic, password } = req.body;

  const user = await User.findOne({ nic });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      name: user.name,
      nic: user.nic,
      title: user.title,
      role: user.role,
      maritalStatus: user.maritalStatus,
      email: user.email,
      address: user.address,
      dob: user.dob,
      gender: user.gender,
      profileImgUrl: user.profileImgUrl,
      nicDetails: user.nicDetails,
      policeReportsDetails: user.policeReportsDetails,
      drivingLicenceDetails: user.drivingLicenceDetails,
    });
  } else {
    res.status(401);
    throw new Error("Invalid nic or password");
  }
});

export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});

export const getUserProfile = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const user = {
      _id: req.user?._id,
      name: req.user?.name,
      nic: req.user?.nic,
      title: req.user?.title,
      role: req.user?.role,
      maritalStatus: req.user?.maritalStatus,
      email: req.user?.email,
      address: req.user?.address,
      dob: req.user?.dob,
      gender: req.user?.gender,
      profileImgUrl: req.user?.profileImgUrl,
      nicDetails: req.user?.nicDetails,
      policeReportsDetails: req.user?.policeReportsDetails,
      drivingLicenceDetails: req.user?.drivingLicenceDetails,
    };
    res.status(200).json(user);
  }
);

export const updateUserProfile = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.nic = req.body.nic || user.nic;
      user.title = req.body.title || user.title;
      user.role = req.body.role || user.role;
      user.maritalStatus = req.body.maritalStatus || user.maritalStatus;
      user.email = req.body.email || user.email;
      user.address = req.body.address || user.address;
      user.dob = req.body.dob || user.dob;
      user.gender = req.body.gender || user.gender;
      user.profileImgUrl = req.body.profileImgUrl || user.profileImgUrl;
      user.nicDetails = req.body.nicDetails || user.nicDetails;
      user.policeReportsDetails =
        req.body.policeReportsDetails || user.policeReportsDetails;
      user.drivingLicenceDetails =
        req.body.drivingLicenceDetails || user.drivingLicenceDetails;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        nic: updatedUser.nic,
        title: updatedUser.title,
        role: updatedUser.role,
        maritalStatus: updatedUser.maritalStatus,
        email: updatedUser.email,
        address: updatedUser.address,
        dob: updatedUser.dob,
        gender: updatedUser.gender,
        profileImgUrl: user.profileImgUrl,
        nicDetails: user.nicDetails,
        policeReportsDetails: user.policeReportsDetails,
        drivingLicenceDetails: user.drivingLicenceDetails,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  }
);

export const getAllRegisterdUsers = asyncHandler(
  async (req: Request, res: Response) => {
    const users = await User.find().lean().select("-createdAt -updatedAt -__v");
    res.status(200).json(users);
  }
);

export const deleteUser = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(400);
      throw new Error("User not found");
    }

    // need to add another check to check whether the user has admin role

    await User.findByIdAndRemove(req.params.id);

    res.status(200).json({ id: req.params.id });
  }
);

export const updateUser = asyncHandler(
  async (req: CustomRequest, res: Response) => {
    const user = await User.findById(req.params.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.nic = req.body.nic || user.nic;
      user.title = req.body.title || user.title;
      user.role = req.body.role || user.role;
      user.maritalStatus = req.body.maritalStatus || user.maritalStatus;
      user.email = req.body.email || user.email;
      user.address = req.body.address || user.address;
      user.dob = req.body.dob || user.dob;
      user.gender = req.body.gender || user.gender;
      user.profileImgUrl = req.body.profileImgUrl || user.profileImgUrl;
      user.nicDetails = req.body.nicDetails || user.nicDetails;
      user.policeReportsDetails =
        req.body.policeReportsDetails || user.policeReportsDetails;
      user.drivingLicenceDetails =
        req.body.drivingLicenceDetails || user.drivingLicenceDetails;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        nic: updatedUser.nic,
        title: updatedUser.title,
        role: updatedUser.role,
        maritalStatus: updatedUser.maritalStatus,
        email: updatedUser.email,
        address: updatedUser.address,
        dob: updatedUser.dob,
        gender: updatedUser.gender,
        profileImgUrl: user.profileImgUrl,
        nicDetails: user.nicDetails,
        policeReportsDetails: user.policeReportsDetails,
        drivingLicenceDetails: user.drivingLicenceDetails,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  }
);
