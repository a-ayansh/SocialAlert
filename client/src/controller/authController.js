import User from "../models/userDetails.js";
import JWTUtils from "../utils/jwt.js";

export default class AuthController {
  static async register(req, res) {
    try {
      const { email, password, firstName, lastName, role, phone, address } =
        req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser)
        return res
          .status(400)
          .json({ success: false, message: "User already exists" });

      const user = new User({
        email,
        password,
        firstName,
        lastName,
        role,
        phone,
        address,
      });
      await user.save();
      const tokens = JWTUtils.generateTokenPair(user);
      res.status(201).json({ success: true, user, tokens });
    } catch (err) {
      console.error("Register Error:", err);
      res.status(500).json({
        success: false,
        message: "Server error",
        error: err.message, // optional for debugging
      });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email }).select("+password");
      if (!user || !user.isActive)
        return res
          .status(401)
          .json({ success: false, message: "Invalid credentials" });

      const isValid = await user.comparePassword(password);
      if (!isValid)
        return res
          .status(401)
          .json({ success: false, message: "Invalid credentials" });

      const tokens = JWTUtils.generateTokenPair(user);
      res.json({ success: true, user, tokens });
    } catch (err) {
      res.status(500).json({ success: false, message: "Login failed" });
    }
  }

  static async refreshToken(req, res) {
    try {
      const { refreshToken } = req.body;
      const decoded = JWTUtils.verifyToken(refreshToken);
      const user = await User.findById(decoded.userId);
      if (!user)
        return res
          .status(401)
          .json({ success: false, message: "Invalid refresh token" });

      const tokens = JWTUtils.generateTokenPair(user);
      res.json({ success: true, tokens });
    } catch {
      res.status(401).json({ success: false, message: "Token refresh failed" });
    }
  }

  static async getProfile(req, res) {
    res.json({ success: true, user: req.user });
  }

  static async updateProfile(req, res) {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
    });
    res.json({ success: true, user });
  }

  static async changePassword(req, res) {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id).select("+password");
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "Wrong current password" });

    user.password = newPassword;
    await user.save();
    res.json({ success: true, message: "Password changed" });
  }
}
