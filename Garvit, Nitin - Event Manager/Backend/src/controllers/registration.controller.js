import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Registration } from "../models/registration.model.js";
import { Event } from "../models/event.model.js";


// Student registers for an event
const registerForEvent = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { eventId } = req.params;

    const event = await Event.findById(eventId);
    if (!event) {
        throw new ApiError(404, "Event not found");
    }

    // prevent duplicate registration
    const exists = await Registration.findOne({
        user_id: userId,
        event_id: eventId
    });

    if (exists) {
        throw new ApiError(400, "You have already registered for this event");
    }

    // create registration
    await Registration.create({
        user_id: userId,
        event_id: eventId
    });

    // increment event stats
    await Event.findByIdAndUpdate(eventId, {
        $inc: { totalRegistrations: 1 }
    });

    return res
        .status(201)
        .json(new ApiResponse(201, null, "Registered successfully"));
});


// Student's registered events
const getUserRegistrations = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const registrations = await Registration.find({ user_id: userId })
        .populate("event_id", "title date time venue");

    return res
        .status(200)
        .json(new ApiResponse(200, registrations));
});


// Admin fetches list of students for a particular event
const getEventRegistrations = asyncHandler(async (req, res) => {
    if (req.user.role !== "admin") {
        throw new ApiError(403, "Only admin can view registrations");
    }

    const { eventId } = req.params;

    const regList = await Registration.find({ event_id: eventId })
        .populate("user_id", "name email")
        .populate("event_id", "title");

    return res
        .status(200)
        .json(new ApiResponse(200, regList));
});


// Check if a user is registered (useful for UI)
const isUserRegistered = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { eventId } = req.params;

    const exists = await Registration.findOne({
        user_id: userId,
        event_id: eventId
    });

    return res
        .status(200)
        .json(new ApiResponse(200, { registered: Boolean(exists) }));
});


export {
    registerForEvent,
    getUserRegistrations,
    getEventRegistrations,
    isUserRegistered
};
