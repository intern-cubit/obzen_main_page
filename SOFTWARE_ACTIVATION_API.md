# Software Activation API Documentation

This document describes how your software products (WA BOMB, Mail Storm, Cubi-View) should integrate with the activation system.

## Base URL
```
http://your-server.com/api/sadmin
```

## Endpoints

### 1. Check Activation Status
**Endpoint:** `POST /check-activation`

**Purpose:** Check if the software is already activated on the current system.

**Request Body:**
```json
{
    "systemId": "unique-system-identifier",
    "appName": "WA BOMB" // or "Mail Storm" or "Cubi-View"
}
```

**Response Examples:**

**Device Not Found (First Time):**
```json
{
    "success": false,
    "activationStatus": "Device not found",
    "deviceActivation": false,
    "message": "Device Not Found"
}
```

**Device Active:**
```json
{
    "success": true,
    "activationStatus": "active",
    "deviceActivation": true
}
```

**Device Expired:**
```json
{
    "success": true,
    "deviceActivation": false,
    "activationStatus": "inactive",
    "message": "Device license has expired."
}
```

### 2. Activate Software
**Endpoint:** `POST /activate`

**Purpose:** Activate the software using an activation key.

**Request Body:**
```json
{
    "systemId": "unique-system-identifier",
    "activationKey": "XXXX-XXXX-XXXX-XXXX",
    "appName": "WA BOMB" // or "Mail Storm" or "Cubi-View"
}
```

**Response Examples:**

**Success:**
```json
{
    "success": true,
    "message": "Device activated successfully",
    "deviceActivation": true,
    "deviceStatus": "active",
    "activationDate": "2025-09-27T14:09:01.942Z"
}
```

**Invalid Activation Key:**
```json
{
    "success": false,
    "message": "Invalid activation key or app name"
}
```

**Already Used on Another Device:**
```json
{
    "success": false,
    "message": "This activation key is already used on another device"
}
```

**License Expired:**
```json
{
    "success": false,
    "message": "License has expired. Please renew your license."
}
```

## Integration Flow

### Software Startup Flow
1. **Get System ID:** Generate or retrieve a unique system identifier
2. **Check Activation:** Call `/check-activation` with systemId and appName
3. **Handle Response:**
   - If `deviceActivation: true` → Software is activated, proceed normally
   - If `deviceActivation: false` → Show activation dialog

### Activation Process
1. **User Input:** Prompt user for activation key
2. **Call Activate:** Send activation key to `/activate` endpoint
3. **Handle Response:**
   - If success → Save activation status locally, proceed with software
   - If error → Show error message, allow retry

### Periodic Validation (Recommended)
- Call `/check-activation` periodically (daily/weekly) to verify license status
- Handle expired licenses gracefully

## System ID Generation

The systemId should be unique per machine. Consider using:
- Machine hardware fingerprint
- OS installation ID
- MAC address + CPU ID combination
- Any stable, unique identifier

**Important:** The same systemId should be generated consistently on the same machine.

## Error Handling

Always handle HTTP errors and network issues gracefully:
- Network timeout → Allow offline usage for a limited period
- Server error → Retry with exponential backoff
- Invalid response → Log error and show user-friendly message

## Security Considerations

1. **HTTPS:** Always use HTTPS in production
2. **System ID:** Don't make it easily spoofable
3. **Rate Limiting:** The API has rate limiting enabled
4. **Error Messages:** Don't expose sensitive information in error handling

## Example Implementation (JavaScript)

```javascript
class SoftwareActivation {
    constructor(appName) {
        this.appName = appName;
        this.baseUrl = 'https://your-server.com/api/sadmin';
        this.systemId = this.generateSystemId();
    }

    async checkActivation() {
        try {
            const response = await fetch(`${this.baseUrl}/check-activation`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    systemId: this.systemId,
                    appName: this.appName
                })
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Activation check failed:', error);
            return { success: false, error: error.message };
        }
    }

    async activate(activationKey) {
        try {
            const response = await fetch(`${this.baseUrl}/activate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    systemId: this.systemId,
                    activationKey: activationKey,
                    appName: this.appName
                })
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Activation failed:', error);
            return { success: false, error: error.message };
        }
    }

    generateSystemId() {
        // Implement your system ID generation logic here
        // This is just an example
        return `SYS-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
}

// Usage
const activation = new SoftwareActivation('WA BOMB');
const status = await activation.checkActivation();
if (!status.deviceActivation) {
    const result = await activation.activate('XXXX-XXXX-XXXX-XXXX');
}
```

## Testing

Use the provided test scripts in the backend folder to test the endpoints:
- `testSoftwareActivationSimple.js` - Basic endpoint testing
- `testRealActivation.js` - Testing with real activation keys

## Support

For integration support or issues, contact the development team.