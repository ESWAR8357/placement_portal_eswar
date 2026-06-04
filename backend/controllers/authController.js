import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  testsTaken: user.testsTaken,
  averageScore: user.averageScore,
  highestScore: user.highestScore,
  createdAt: user.createdAt
});

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Name, email, and password are required");
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      res.status(409);
      throw new Error("User already exists with this email");
    }

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password
    });

    res.status(201).json({
      user: sanitizeUser(user),
      token: generateToken(user._id)
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("Email and password are required");
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() }).select("+password");

    if (!user || !(await user.matchPassword(password))) {
      res.status(401);
      throw new Error("Invalid email or password");
    }

    res.status(200).json({
      user: sanitizeUser(user),
      token: generateToken(user._id)
    });
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req, res) => {
  res.status(200).json({
    user: sanitizeUser(req.user)
  });
};

export const updateProfile = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    if (!name?.trim() || !email?.trim()) {
      res.status(400);
      throw new Error("Name and email are required");
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({
      email: normalizedEmail,
      _id: { $ne: req.user._id }
    });

    if (existingUser) {
      res.status(409);
      throw new Error("Email is already in use");
    }

    req.user.name = name.trim();
    req.user.email = normalizedEmail;

    const updatedUser = await req.user.save();

    res.status(200).json({
      user: sanitizeUser(updatedUser)
    });
  } catch (error) {
    next(error);
  }
};
