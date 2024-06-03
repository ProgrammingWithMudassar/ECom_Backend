const express = require("express");
const router = express.Router();
const {
  registerUser,
  authUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  blockUser,
  unblockUser
} = require("../controllers/userController");

// Routes
router.post("/register", registerUser);
router.post("/login", authUser);
router.get("/all-users", getAllUsers);
router.get("/user-by-id/:id", getUserById);
router.put("/change-personal-detail/:id", updateUser);
router.delete("/delete-user/:id", deleteUser);

// Block a user
router.put('/block/:id', blockUser);

// Unblock a user
router.put('/unblock/:id', unblockUser);

module.exports = router;
