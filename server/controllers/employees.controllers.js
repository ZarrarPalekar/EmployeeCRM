import { deleteImage, uploadImage } from "../libs/cloudinary.js";
import Employee from "../models/Employee.js";
import fs from "fs-extra";

export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({});
    return res.json(employees);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createEmployee = async (req, res) => {
  try {
    const { name, age, email, dob, address } = req.body;
    let image = null;
    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      await fs.remove(req.files.image.tempFilePath);
      image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }
    const newEmployee = new Employee({ name, age, email, dob, address, image });
    await newEmployee.save();
    return res.json(newEmployee);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);
    if (!employee) return res.sendStatus(404);
    return res.json(employee);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    // TODO: validate req.body before to update

    // if a new image is uploaded upload it to cloudinary
    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      await fs.remove(req.files.image.tempFilePath);
      // add the new image to the req.body
      req.body.image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { $set: req.body },
      {
        new: true,
      }
    );
    return res.json(updatedEmployee);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const removeEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByIdAndDelete(id);

    if (employee && employee.image.public_id) {
      await deleteImage(employee.image.public_id);
    }

    if (!employee) return res.sendStatus(404);
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
