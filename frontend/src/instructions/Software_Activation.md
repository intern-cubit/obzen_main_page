Guide: Implementing Software Purchase & Activation Workflow
This document outlines the step-by-step process for building the feature that allows users to purchase software, manage their licenses, and activate them using a System ID.

1. Data Models Reference
We will be working with a Software or License model that needs to accommodate the activation details. Ensure your model contains fields similar to this:

// Example Software License/Copy Model
import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema(
    {
        systemId: {
            type: String,
            required: true,
        },
        activationKey: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
        },
        adminId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        deviceStatus: {
            type: String,
            enum: ["active", "inactive"],
            default: "inactive",
        },
        deviceActivation: {
            type: Boolean,
            default: false,
        },
        expirationDate: {
            type: Date,
            required: true,
        },
        appName:{
            type: String,
            required: true,
            enum: ["WA BOMB", "Email Storm", "Cubi-View"],
        }
    },
    { timestamps: true }
);

export default mongoose.model("Device", deviceSchema);


2. Step-by-Step Implementation
Step 1: UI - "Buy Now" & Quantity Selection
Location: productsPage and productDetailsPage

Conditional Logic: Check if product.category === 'software'.

"Buy Now" Button: If it's software, the "Add to Cart" button could be replaced with or accompanied by a "Buy Now" button.

Quantity Handling:

Clicking "Buy Now" should open a modal or a dedicated view.

This view must have an input field for the user to specify the number of copies they want to buy (for bulk purchases).

Display the price per copy and the dynamically calculated total price (price * quantity).

A "Proceed to Payment" button will initiate the checkout process.

Step 2: Payment & Order Creation
Initiate Payment: On "Proceed to Payment", redirect the user to a summary page that displays the final calculated amount.

Simulate Payment (For Development):

On the summary page, instead of integrating a real payment gateway, add a "Confirm Purchase" button.

When the user clicks "Confirm Purchase", the payment is marked as "done" internally. This action should directly call the backend endpoint responsible for handling a successful transaction. This allows you to test the full purchase and activation flow without a live payment gateway.

Handle Payment Success: In your UserController, create a backend endpoint that the payment gateway (or the simulation button) calls upon a successful transaction.

Create License Copies: Inside this controller method:

Create the main Order record as usual.

Based on the quantity purchased, create that many individual records in your SoftwareLicenses (or equivalent) collection.

For each new license record, set:

userId, softwareId, orderId

status: 'inactive'

All other fields like systemId, activationKey, etc., should be null.

Step 3: UI - Orders & Software Management Tab
Create a New Route/Tab: In the user's "My Orders" section, add a new tab or sub-page called "My Software".

Fetch Data: When the user visits this page, make an API call to a new endpoint in UserController (e.g., getUserSoftware) that fetches all license records for the logged-in user.

Display Software:

Group the licenses by softwareId so you can display each purchased application as a distinct item.

For each software item, display:

Software Name/Icon.

A summary: "You have X total licenses. (Y active, Z available)".

A list or dropdown showing each individual license copy.

Step 4: UI - The Activation Form
List Individual Copies: For each software, list all associated license copies.

Conditional View:

If license.status === 'inactive': Display the status as "Ready to Activate" and show an "Activate" button.

If license.status === 'active': Display the activation details: System ID, Friendly Name, and Activation Key. The "Activate" button should be hidden or disabled.

Activation Modal:

Clicking the "Activate" button should open a modal.

The modal must contain a form with two fields:

System ID: (Text Input, Required)

Name: (Text Input, Optional, e.g., placeholder "My Personal PC")

Include a "Generate Key" or "Activate" button within the modal.

Step 5: Backend - Activation Logic
Create Activation Endpoint: In your UserController, create a new POST endpoint, for example: POST /api/software/activate.

Request Body: This endpoint should expect a body containing licenseId, systemId, and friendlyName.

Controller Logic:

Find the license record by licenseId.

Validation: Verify that the license belongs to the current user and its status is 'inactive'.

Generate Key: Create a secure, unique activation key. A combination of the licenseId, systemId, and a timestamp, hashed, is a good approach.

Update Record: Update the license record in the database:

set deviceActivation = true

set systemId = <provided_systemId>

set friendlyName = <provided_name>

set activationKey = <generated_key>

set activatedAt = new Date()

Response: Return the complete, updated license object (including the new activationKey) to the frontend.

Step 6: Finalizing the UI
Handle API Response: On a successful response from the activation endpoint, the frontend should:

Close the activation modal.

Update the state of the UI to reflect the changes for that specific license copy. It should now show the new status, System ID, and the activation key.

Display Activation Key: Clearly display the activationKey. Add a "Copy to Clipboard" button next to it for user convenience.

Update Summary: The summary counts ("Y active, Z available") should update automatically.

This structured flow ensures a seamless experience from purchase to activation, providing clarity and control to the user over their software licenses.


import Device from "../models/Device.js";
import { generateWabombActivationKey } from "../utils/generateWabombActivationKey.js";
import { generateEmailStormActivationKey } from "../utils/generateEmailStormActivationKey.js";
import { generateCubiViewActivationKey } from "../utils/generateCubiViewActivationKey.js"; 


//appName will come as we buy the software itself, validityType is always lifetime for wabomb and mailStorm, only cubiview has customValidityDate, edit the products to have monthly values and lifetime values, a cubiview has monthly value for custom date, and lifetime has one, this should be done while buying itself, not while activating and giving the system id
export const add_device = async (req, res) => {
    const { systemId, name, appName, validityType, customValidityDate } = req.body;
    const { id: adminId } = req.user;

    try {
        if (!systemId || !appName || !validityType) {
            return res.status(400).json({ message: "All required fields are missing." });
        }

        if (appName !== "WA BOMB" && appName !== "Email Storm" && appName !== "Cubi-View") {
            return res.status(400).json({ message: "Invalid app type. Must be 'WA BOMB', 'Email Storm' or 'Cubi-view'." });
        }

        if (validityType !== "CUSTOM_DATE" && validityType !== "LIFETIME") {
            return res.status(400).json({ message: "Invalid validity type. Must be 'CUSTOM_DATE' or 'LIFETIME'." });
        }

        let expirationDate;
        if (validityType === "CUSTOM_DATE") {
            if (!customValidityDate) {
                return res.status(400).json({ message: "Custom validity date is required for 'CUSTOM_DATE' type." });
            }
            const parsedDate = new Date(customValidityDate);
            if (isNaN(parsedDate.getTime())) {
                return res.status(400).json({ message: "Invalid custom validity date format." });
            }

            parsedDate.setHours(23, 59, 59, 999);
            if (parsedDate < new Date()) {
                return res.status(400).json({ message: "Custom validity date cannot be in the past." });
            }
            expirationDate = parsedDate;

        } else if (validityType === "LIFETIME") {
            expirationDate = new Date('9999-12-31T23:59:59Z');
        }

        const existingDevice = await Device.findOne({
            systemId,
            appName,
        });

        if (existingDevice) {
            return res.status(400).json({ message: `Device with System ID ${systemId}', and App '${appName}' already exists.` });
        }

        let activationKey;
        if (appName === "WA BOMB") {
            activationKey = generateWabombActivationKey(systemId);
        } else if (appName === "Email Storm") {
            activationKey = generateEmailStormActivationKey(systemId);
        } else if (appName === "Cubi-View") {
            activationKey = generateCubiViewActivationKey(systemId); // Assuming same key generation for Cubi-View
        }
        console.log("Generated Activation Key:", activationKey);

        if (!activationKey) {
            return res.status(500).json({ message: "Failed to generate activation key." });
        }

        const deviceData = {
            systemId,
            activationKey,
            deviceStatus: "active",
            expirationDate,
            appName,
            adminId,
        };

        if (name && name.trim() !== "") {
            deviceData.name = name.trim();
        }

        const device = new Device(deviceData);
        await device.save(); 

        return res.status(201).json({ device });

    } catch (error) {
        console.error("Add device error:", error);

        if (error.code === 11000 && error.keyPattern && error.keyPattern.systemId) {
            return res.status(400).json({
                message: `A device with System ID '${error.keyValue.systemId}' already exists. System ID must be unique.`,
                errorCode: 'DUPLICATE_MAC_ID'
            });
        } else if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: "Server Error" });
    }
};

export const getDevices = async (req, res) => {
    const { id: adminId } = req.user;
    try {
        const devices = await Device.find({ adminId });
        return res.status(200).json(devices);
    } catch (error) {
        console.error("Get devices error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};
