import { Router } from "express";
import {
    registerForEvent,
    getUserRegistrations,
    getEventRegistrations,
    isUserRegistered
} from "../controllers/registration.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// student routes
router.route('/register/:eventId').post(verifyJWT, registerForEvent);
router.route('/my').get(verifyJWT, getUserRegistrations);
router.route('/check/:eventId').get(verifyJWT, isUserRegistered);

// admin routes
router.route('/admin/:eventId').get(verifyJWT, getEventRegistrations);

export default router;