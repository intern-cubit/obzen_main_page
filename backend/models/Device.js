import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema(
    {
        systemId: {
            type: String,
            required: function() {
                return this.licenseStatus === 'active';
            },
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
        appName: {
            type: String,
            required: true,
            enum: ["WA BOMB", "Email Storm", "Cubi-View"],
        },
        // Additional fields for software license management
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            required: false, // Optional for backward compatibility
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: false, // Optional for backward compatibility
        },
        purchaseDate: {
            type: Date,
            default: Date.now,
        },
        activatedAt: {
            type: Date,
        },
        validityType: {
            type: String,
            enum: ["CUSTOM_DATE", "LIFETIME"],
            required: true,
        },
        licenseStatus: {
            type: String,
            enum: ["inactive", "active", "expired"],
            default: "inactive",
        }
    },
    { timestamps: true }
);

// Index for efficient queries
deviceSchema.index({ adminId: 1, appName: 1 });
deviceSchema.index({ systemId: 1, appName: 1 });
deviceSchema.index({ activationKey: 1 });

export default mongoose.model("Device", deviceSchema);