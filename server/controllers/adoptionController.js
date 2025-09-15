import asyncHandler from "express-async-handler";
import AdoptionApplication from "../models/AdoptionApplication.js";
import Notification from "../models/Notification.js";
import Pet from "../models/Pet.js";

// Submit adoption application
// POST /api/adoptions/apply
// Access: logged-in users (non-shelters)
export const submitApplication = asyncHandler(async (req, res) => {
  const { pet, applicant } = req.body;

  // Check if pet exists
  const petData = await Pet.findById(pet).populate('postedBy');
  if (!petData) {
    res.status(404);
    throw new Error("Pet not found");
  }

  // Check if user already applied for this pet
  const existingApplication = await AdoptionApplication.findOne({
    pet: pet,
    user: req.user._id
  });

  if (existingApplication) {
    res.status(400);
    throw new Error("You have already applied for this pet");
  }

  // Create adoption application
  const application = await AdoptionApplication.create({
    pet: pet,
    user: req.user._id,
    applicant: applicant,
    status: "Pending"
  });

  // Create notification for shelter
  await Notification.create({
    user: petData.postedBy._id,
    type: 'application_received',
    title: 'New Adoption Application',
    message: `${req.user.name} has submitted an adoption application for ${petData.name}`,
    data: {
      applicationId: application._id,
      petId: pet,
      applicantId: req.user._id
    }
  });

  res.status(201).json(application);
});

// Express interest in a pet (legacy endpoint)
// POST /api/adoptions/:petId
// Access: logged-in users (non-shelters)
export const expressInterest = asyncHandler(async (req, res) => {
  const { petId } = req.params;

  // Check if pet exists
  const pet = await Pet.findById(petId);
  if (!pet) {
    res.status(404);
    throw new Error("Pet not found");
  }

  // Create adoption application
  const application = await AdoptionApplication.create({
    pet: pet._id,
    user: req.user._id,
  });

  res.status(201).json(application);
});

// Get all applications for a shelter's pets
// GET /api/adoptions/mypets
// Access: shelter only
export const getApplicationsForShelter = asyncHandler(async (req, res) => {
  const pets = await Pet.find({ postedBy: req.user._id });
  const petIds = pets.map(p => p._id);

  const applications = await AdoptionApplication.find({ pet: { $in: petIds } })
    .populate("pet")
    .populate("user");

  res.json(applications);
});

// Get user's applications
// GET /api/adoptions/my-applications
// Access: logged-in users
export const getMyApplications = asyncHandler(async (req, res) => {
  const applications = await AdoptionApplication.find({ user: req.user._id })
    .populate("pet")
    .populate("pet.postedBy", "name email")
    .sort({ createdAt: -1 });

  res.json(applications);
});

// Update application status
// PUT /api/adoptions/:id
// Access: shelter only
export const updateApplicationStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, notes } = req.body;

  const app = await AdoptionApplication.findById(id).populate("pet").populate("user");
  if (!app) {
    res.status(404);
    throw new Error("Application not found");
  }

  // Ensure shelter owns the pet
  if (app.pet.postedBy.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized");
  }

  const oldStatus = app.status;
  app.status = status;
  if (notes) {
    app.notes = notes;
  }
  await app.save();

  // Create notification for applicant if status changed
  if (oldStatus !== status) {
    let notificationType, notificationTitle, notificationMessage;
    
    switch (status) {
      case 'Contacted':
        notificationType = 'application_contacted';
        notificationTitle = 'Application Contacted';
        notificationMessage = `The shelter has contacted you regarding your application for ${app.pet.name}`;
        break;
      case 'Approved':
        notificationType = 'application_approved';
        notificationTitle = 'Application Approved';
        notificationMessage = `Congratulations! Your application for ${app.pet.name} has been approved`;
        break;
      case 'Rejected':
        notificationType = 'application_rejected';
        notificationTitle = 'Application Update';
        notificationMessage = `Your application for ${app.pet.name} has been reviewed`;
        break;
      default:
        notificationType = 'application_update';
        notificationTitle = 'Application Update';
        notificationMessage = `Your application for ${app.pet.name} has been updated`;
    }

    await Notification.create({
      user: app.user._id,
      type: notificationType,
      title: notificationTitle,
      message: notificationMessage,
      data: {
        applicationId: app._id,
        petId: app.pet._id,
        status: status
      }
    });
  }

  res.json(app);
});
