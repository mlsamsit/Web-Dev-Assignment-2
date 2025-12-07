import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Event } from "../models/event.model.js";
import { Registration } from "../models/registration.model.js";


// Admin creates an event
const createEvent = asyncHandler(async (req, res) => {
    if (req.user.role !== "admin") {
        throw new ApiError(403, "Only admin can create events");
    }

    const { title, description, date, time, venue } = req.body;

    if (!title || !description || !date || !time || !venue) {
        throw new ApiError(400, "All fields are required");
    }

    const event = await Event.create({
        title,
        description,
        date,
        time,
        venue
    });

    return res
        .status(201)
        .json(new ApiResponse(201, event, "Event created successfully"));
});

// Admin updates an event
const updateEvent = asyncHandler(async (req, res) => {
    if (req.user.role !== "admin") {
        throw new ApiError(403, "Only admin can update events");
    }

    const { id } = req.params;

    const event = await Event.findById(id);
    if (!event) {
        throw new ApiError(404, "Event not found");
    }

    const updatedEvent = await Event.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true, runValidators: true }
    );

    return res
        .status(200)
        .json(new ApiResponse(200, updatedEvent, "Event updated successfully"));
});

// Admin deletes an event
const deleteEvent = asyncHandler(async (req, res) => {
    if (req.user.role !== "admin") {
        throw new ApiError(403, "Only admin can delete events");
    }

    const { id } = req.params;

    const event = await Event.findById(id);
    if (!event) {
        throw new ApiError(404, "Event not found");
    }

    await event.deleteOne();

    return res
        .status(200)
        .json(new ApiResponse(200, null, "Event deleted successfully"));
});

// Public — fetch all events
const getAllEvents = asyncHandler(async (req, res) => {
    const events = await Event.find().sort({ date: 1 });

    return res.status(200).json(new ApiResponse(200, events));
});


// Public — fetch event by id
const getEventById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const event = await Event.findById(id);
    if (!event) {
        throw new ApiError(404, "Event not found");
    }

    return res.status(200).json(new ApiResponse(200, event));
});

// Admin — get stats for each event
const getEventStats = asyncHandler(async (req, res) => {
    if (req.user.role !== "admin") {
        throw new ApiError(403, "Only admin can view stats");
    }

    // aggregate registrations per event
    const stats = await Registration.aggregate([
        {
            $group: {
                _id: "$event_id",
                totalRegistrations: { $sum: 1 }
            }
        },
        {
            $lookup: {
                from: "events",
                localField: "_id",
                foreignField: "_id",
                as: "event"
            }
        },
        { $unwind: "$event" },
        {
            $project: {
                _id: 0,
                eventId: "$event._id",
                title: "$event.title",
                totalRegistrations: 1
            }
        }
    ]);

    return res.status(200).json(new ApiResponse(200, stats));
});

export {
    createEvent,
    updateEvent,
    deleteEvent,
    getAllEvents,
    getEventById,
    getEventStats
};
