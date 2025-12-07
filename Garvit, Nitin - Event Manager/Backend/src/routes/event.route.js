import { Router } from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js";
import { createEvent, deleteEvent, updateEvent, getAllEvents, getEventById, getEventStats } from "../controllers/event.controller.js";

const router = Router();
router.route("/").get(getAllEvents);
router.route("/:id").get(getEventById);

// Admin routes
router.route("/").post(verifyJWT, createEvent);
router.route("/:id").put(verifyJWT, updateEvent);
router.route("/:id").delete(verifyJWT, deleteEvent);
router.route("/admin/stats/all").get(verifyJWT, getEventStats);

export default router;