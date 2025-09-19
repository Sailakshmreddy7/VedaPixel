const express = require("express");
const router = express.Router();
const { verifyAdmin, verifyToken } = require("../middlewares/auth");
const {
  createEvent,
  updateEvent,
  deleteEvent,
  getFutureEvents,
  getEventById,
  getAllEvents,
} = require("../controllers/events");

router.post("/create", verifyToken, verifyAdmin, createEvent);
router.put("/update/:id", verifyToken, verifyAdmin, updateEvent);
router.delete("/delete/:id", verifyToken, verifyAdmin, deleteEvent);
router.get("/events", verifyToken, getAllEvents);
router.get("/event/:id", verifyToken, getEventById);
router.get("/all-events", verifyToken, verifyAdmin, getAllEvents);

module.exports = router;
