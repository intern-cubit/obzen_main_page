import Device from "../models/Device.js";

export const checkActivation = async (req, res) => {
    try {
        const { systemId, appName } = req.body;

        if (!systemId || !appName) {
            return res.status(400).json({
                success: false,
                activationStatus: "systemId and app name are required",
            });
        }

        const device = await Device.findOne({ systemId, appName });

        if (!device) {
            return res.status(201).json({
                success: false,
                activationStatus: "Device not found",
                deviceActivation: false,
                message: "Device Not Found"
            });
        }

        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        if (device.expirationDate && currentDate > device.expirationDate) {
            device.deviceStatus = "inactive";
            device.deviceActivation = false;
            await device.save();

            return res.status(200).json({
                success: true,
                deviceActivation: false,
                activationStatus: "inactive",
                message: "Device license has expired.",
            });
        }

        res.status(200).json({
            success: true,
            activationStatus: device.deviceStatus,
            deviceActivation: device.deviceActivation,
        });
    } catch (error) {
        console.error("Error in checkActivation:", error);
        res.status(500).json({
            success: false,
            activationStatus: "Error checking activation",
            deviceActivation: false,
            error: error.message,
        });
    }
};

export const activate = async (req, res) => {
    try {
        const { systemId, activationKey, appName } = req.body;

        if (!systemId || !activationKey || !appName) {
            return res.status(400).json({
                success: false,
                message: "systemId, activationKey, and app name are required",
            });
        }

        const device = await Device.findOne({ activationKey, appName });

        if (!device) {
            return res.status(404).json({
                success: false,
                message: "Invalid activation key or app name",
            });
        }

        // Check if device is already activated with a different system ID
        if (device.systemId && device.systemId !== systemId) {
            return res.status(400).json({
                success: false,
                message: "This activation key is already used on another device",
            });
        }

        // Check if license has expired
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        if (device.expirationDate && currentDate > device.expirationDate) {
            return res.status(400).json({
                success: false,
                message: "License has expired. Please renew your license.",
            });
        }

        // Activate the device
        device.systemId = systemId;
        device.deviceActivation = true;
        device.deviceStatus = "active";
        device.activationDate = new Date();
        await device.save();

        res.status(200).json({
            success: true,
            message: "Device activated successfully",
            deviceActivation: device.deviceActivation,
            deviceStatus: device.deviceStatus,
            activationDate: device.activationDate,
        });
    } catch (error) {
        console.error("Error in activate:", error);
        res.status(500).json({
            success: false,
            message: "Error activating device",
            error: error.message,
        });
    }
};