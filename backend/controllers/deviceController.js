import Device from "../models/Device.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import { generateWabombActivationKey } from "../utils/generateWabombActivationKey.js";
import { generateEmailStormActivationKey } from "../utils/generateEmailStormActivationKey.js";
import { generateCubiViewActivationKey } from "../utils/generateCubiViewActivationKey.js";

// Create software licenses after successful payment
export const createSoftwareLicenses = async (req, res) => {
    try {
        const { orderId, productId, quantity, appName, validityType, customValidityDate } = req.body;
        const { id: userId } = req.user;

        if (!orderId || !productId || !quantity || !appName || !validityType) {
            return res.status(400).json({ message: "All required fields are missing." });
        }

        // Validate order belongs to user
        const order = await Order.findOne({ _id: orderId, user: userId });
        if (!order) {
            return res.status(404).json({ message: "Order not found or doesn't belong to user." });
        }

        // Validate product
        const product = await Product.findById(productId);
        if (!product || !product.isSoftware) {
            return res.status(404).json({ message: "Software product not found." });
        }

        // Calculate expiration date
        let expirationDate;
        if (validityType === "CUSTOM_DATE") {
            if (!customValidityDate) {
                return res.status(400).json({ message: "Custom validity date is required for 'CUSTOM_DATE' type." });
            }
            const parsedDate = new Date(customValidityDate);
            if (isNaN(parsedDate.getTime()) || parsedDate < new Date()) {
                return res.status(400).json({ message: "Invalid custom validity date." });
            }
            parsedDate.setHours(23, 59, 59, 999);
            expirationDate = parsedDate;
        } else if (validityType === "LIFETIME") {
            expirationDate = new Date('9999-12-31T23:59:59Z');
        }

        // Create multiple licenses based on quantity
        const licenses = [];
        for (let i = 0; i < quantity; i++) {
            // Generate a temporary activation key (will be replaced when activated)
            const tempActivationKey = `TEMP-${Date.now()}-${i}`;
            
            const license = new Device({
                systemId: '', // Will be set during activation
                activationKey: tempActivationKey,
                adminId: userId,
                deviceStatus: "inactive",
                deviceActivation: false,
                expirationDate,
                appName,
                orderId,
                productId,
                validityType,
                licenseStatus: "inactive"
            });

            await license.save();
            licenses.push(license);
        }

        return res.status(201).json({ 
            message: `${quantity} software license(s) created successfully`,
            licenses 
        });

    } catch (error) {
        console.error("Create software licenses error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Get user's software licenses
export const getUserSoftwareLicenses = async (req, res) => {
    try {
        const { id: userId } = req.user;

        const licenses = await Device.find({ adminId: userId })
            .populate('productId', 'title backgroundImage')
            .populate('orderId', 'orderNumber createdAt')
            .sort({ createdAt: -1 });

        // Group licenses by software/product
        const groupedLicenses = licenses.reduce((acc, license) => {
            const key = license.productId._id.toString();
            if (!acc[key]) {
                acc[key] = {
                    product: license.productId,
                    appName: license.appName,
                    licenses: [],
                    totalCount: 0,
                    activeCount: 0,
                    availableCount: 0
                };
            }
            
            acc[key].licenses.push(license);
            acc[key].totalCount++;
            
            if (license.licenseStatus === 'active') {
                acc[key].activeCount++;
            } else if (license.licenseStatus === 'inactive') {
                acc[key].availableCount++;
            }
            
            return acc;
        }, {});

        return res.status(200).json(Object.values(groupedLicenses));

    } catch (error) {
        console.error("Get user software licenses error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Activate software license
export const activateSoftwareLicense = async (req, res) => {
    try {
        const { licenseId, systemId, friendlyName } = req.body;
        const { id: userId } = req.user;

        if (!licenseId || !systemId) {
            return res.status(400).json({ message: "License ID and System ID are required." });
        }

        // Find the license
        const license = await Device.findOne({ 
            _id: licenseId, 
            adminId: userId 
        }).populate('productId');

        if (!license) {
            return res.status(404).json({ message: "License not found or doesn't belong to user." });
        }

        if (license.licenseStatus === 'active') {
            return res.status(400).json({ message: "License is already activated." });
        }

        // Check if system ID is already used for this app
        const existingDevice = await Device.findOne({
            systemId,
            appName: license.appName,
            licenseStatus: 'active'
        });

        if (existingDevice) {
            return res.status(400).json({ 
                message: `System ID ${systemId} is already activated for ${license.appName}.` 
            });
        }

        // Generate activation key based on app type
        let activationKey;
        if (license.appName === "WA BOMB") {
            activationKey = generateWabombActivationKey(systemId);
        } else if (license.appName === "Email Storm") {
            activationKey = generateEmailStormActivationKey(systemId);
        } else if (license.appName === "Cubi-View") {
            activationKey = generateCubiViewActivationKey(systemId);
        }

        if (!activationKey) {
            return res.status(500).json({ message: "Failed to generate activation key." });
        }

        // Update license
        license.systemId = systemId;
        license.activationKey = activationKey;
        license.deviceStatus = "active";
        license.deviceActivation = true;
        license.licenseStatus = "active";
        license.activatedAt = new Date();
        
        if (friendlyName && friendlyName.trim() !== "") {
            license.name = friendlyName.trim();
        }

        await license.save();

        return res.status(200).json({ 
            message: "License activated successfully",
            license 
        });

    } catch (error) {
        console.error("Activate software license error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Get all devices (for admin or existing functionality)
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

// Direct device addition (existing functionality from instructions)
export const add_device = async (req, res) => {
    const { systemId, name, appName, validityType, customValidityDate } = req.body;
    const { id: adminId } = req.user;

    try {
        if (!systemId || !appName || !validityType) {
            return res.status(400).json({ message: "All required fields are missing." });
        }

        if (appName !== "WA BOMB" && appName !== "Email Storm" && appName !== "Cubi-View") {
            return res.status(400).json({ message: "Invalid app type. Must be 'WA BOMB', 'Email Storm' or 'Cubi-View'." });
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
            return res.status(400).json({ message: `Device with System ID ${systemId} and App '${appName}' already exists.` });
        }

        let activationKey;
        if (appName === "WA BOMB") {
            activationKey = generateWabombActivationKey(systemId);
        } else if (appName === "Email Storm") {
            activationKey = generateEmailStormActivationKey(systemId);
        } else if (appName === "Cubi-View") {
            activationKey = generateCubiViewActivationKey(systemId);
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
            deviceActivation: true,
            licenseStatus: "active"
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