# About Section Admin Guide

## Overview
The About section has been redesigned to support the new content structure focused on tracking and safety solutions.

## Changes Made

### 1. Team Images Updated
- **Jithin Sunny**: Using `JithinSunny.jpeg`
- **Tanya Meril Vattathil**: Using `Tanya.jpeg`
- **Melwin George Antony**: Using `Melwin.jpeg`
- **Maxon Joseph Antony**: Using `max.jpg`

All images are now properly imported from `frontend/src/assets/images/`

### 2. About Section Structure

The new About section supports:

#### **Main Heading**
Example: "Who We Are"

#### **Sub Heading**
Brief company description (2-3 sentences)
Example: "Obzen Technolabs is a deep-tech company focused on revolutionizing the future of tracking and safety."

#### **Introduction Description**
What you're building (2-3 sentences)
Example: "We are building intelligent, globally scalable solutions that protect people, pets and assets through a powerful blend of advanced hardware design and smart software architectures."

#### **Content Sections** (Dynamic - Add as many as needed)
Each section has:
- **Section Heading**: e.g., "Our Approach", "Our Mission", "Our Vision"
- **Section Content**: Paragraph text with optional bullet points

**Bullet Points Format:**
```
Our approach is centred around creating tracking systems that are:

• High-reliability across diverse real-world environments
• Affordably accessible to families and businesses
• Simple and intuitive for everyday use
• Designed for seamless, persistent connectivity
```

#### **Closing Statement**
Optional inspiring final message
Example: "We're driven by the belief that safety should be universal, effortless and always within reach."

#### **Optional Image**
You can upload a single image for the About section

## How to Update Content via Admin

1. **Login to Admin Panel**
   - Navigate to `/admin/login`
   - Access the "About" section

2. **Fill in the fields:**
   - Main Heading: "Who We Are"
   - Sub Heading: Company description
   - Intro Description: What you're building

3. **Add Content Sections** (Click "Add Section" button):
   
   **Section 1 - Our Approach:**
   - Heading: `Our Approach`
   - Content:
   ```
   Our approach is centred around creating tracking systems that are:
   
   • High-reliability across diverse real-world environments
   • Affordably accessible to families and businesses
   • Simple and intuitive for everyday use
   • Designed for seamless, persistent connectivity
   ```

   **Section 2 - Our Mission:**
   - Heading: `Our Mission`
   - Content: `To build and deliver intelligent, reliable and affordable tracking solutions to protect loved ones, safeguard possessions and promote a secure & connected society.`

   **Section 3 - Our Vision:**
   - Heading: `Our Vision`
   - Content: `To become the world's leading IoT and Positioning Solutions provider, driven by a unique and globally pervasive hybrid communications network that integrates self-owned intelligent satellites and terrestrial systems.`

4. **Closing Statement:**
   ```
   We're driven by the belief that safety should be universal, effortless and always within reach.
   ```

5. **Click "Save Changes"**

## Features

- **Drag & Reorder**: Use ↑ ↓ arrows to reorder sections
- **Live Preview**: See how your content will look before saving
- **Image Upload**: Optional image with preview and delete functionality
- **Bullet Point Support**: Use • at the start of lines for bullet points

## Database Schema

The About model now has these default values aligned with the new content:
- `mainHeading`: "Who We Are"
- `subHeading`: "Obzen Technolabs is a deep-tech company..."
- `introDescription`: "We are building intelligent..."
- `contentSections`: Array of dynamic sections
- `closingStatement`: "We're driven by the belief..."

## Frontend Display

The AboutApple component automatically:
- Displays content in a clean, Apple-inspired design
- Formats bullet points (lines starting with •) as left-aligned lists
- Shows sections in order based on the `order` field
- Applies smooth scroll animations
- Maintains responsive design for all screen sizes
