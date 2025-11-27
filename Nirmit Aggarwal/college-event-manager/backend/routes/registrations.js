import express from "express";
import Registration from "../models/Registration.js";
import { authMiddleware, adminMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Register user for event
router.post("/:eventId", authMiddleware, async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user.userId;

    const existingRegistration = await Registration.findOne({
      userId,
      eventId,
    });

    if (existingRegistration) {
      return res
        .status(409)
        .json({ error: "Already registered for this event" });
    }

    const registration = new Registration({
      userId,
      eventId,
    });

    await registration.save();
    res.status(201).json(registration);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user's registrations
router.get("/my-registrations", authMiddleware, async (req, res) => {
  try {
    const registrations = await Registration.find({
      userId: req.user.userId,
    }).populate("eventId");

    res.json(registrations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get registrations count for an event (admin)
router.get(
  "/admin/count/:eventId",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const count = await Registration.countDocuments({
        eventId: req.params.eventId,
      });

      res.json({ eventId: req.params.eventId, count });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

export default router;
