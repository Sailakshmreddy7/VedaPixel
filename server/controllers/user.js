const Booking = require("../models/Booking");
const { validateUserProfile } = require("../validations/auth");
// Get current user profile
async function getCurrentUser(req, res) {
  try {
    const user = req.user;
    if (!user) return res.status(404).json({ message: "User not found" });

    // Only expose safe user fields
    const safeUser = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };

    res.status(200).json({ user: safeUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

// update user profile
async function updateUserProfile(req, res) {
  try {
    const user = req.user;
    if (!user) return res.status(404).json({ message: "User not found" });

    const { firstName, lastName, email } = req.body;

    // Run validation
    const validationError = validateUserProfile({ firstName, lastName, email });
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    // Check for email uniqueness if changed
    if (email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }

    // Update fields
    user.firstName = firstName.trim();
    user.lastName = lastName.trim();
    user.email = email.trim().toLowerCase();

    await user.save();

    res.status(200).json({ user });
  } catch (err) {
    console.error("Update profile error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = { getCurrentUser, updateUserProfile };
