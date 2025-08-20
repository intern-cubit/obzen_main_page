import nodemailer from 'nodemailer';

// Create transporter based on environment
const createTransporter = () => {
  if (process.env.NODE_ENV === 'production') {
    // Production email service (e.g., SendGrid, SES)
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  } else {
    // Development - use Ethereal for testing
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: process.env.ETHEREAL_USER || 'ethereal.user@ethereal.email',
        pass: process.env.ETHEREAL_PASS || 'ethereal.pass'
      }
    });
  }
};

const transporter = createTransporter();

// Email templates
const templates = {
  verification: ({ name, verificationUrl }) => ({
    subject: 'Verify Your CuBIT Account',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">Welcome to CuBIT!</h1>
        <p>Hello ${name},</p>
        <p>Thank you for registering with CuBIT. Please verify your email address by clicking the button below:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" 
             style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
            Verify Email Address
          </a>
        </div>
        <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
        <p><a href="${verificationUrl}">${verificationUrl}</a></p>
        <p>This link will expire in 24 hours.</p>
        <p>Best regards,<br>The CuBIT Team</p>
      </div>
    `
  }),

  passwordReset: ({ name, resetUrl }) => ({
    subject: 'Reset Your Password - CuBIT',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">Password Reset Request</h1>
        <p>Hello ${name},</p>
        <p>We received a request to reset your password for your CuBIT account.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" 
             style="background-color: #dc3545; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
            Reset Password
          </a>
        </div>
        <p>If you didn't request this password reset, please ignore this email.</p>
        <p>This link will expire in 10 minutes for security reasons.</p>
        <p>Best regards,<br>The CuBIT Team</p>
      </div>
    `
  }),

  orderConfirmation: ({ name, orderNumber, items, totalAmount, shippingAddress }) => ({
    subject: `Order Confirmation - ${orderNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">Order Confirmed!</h1>
        <p>Hello ${name},</p>
        <p>Thank you for your order. We've received your order and it's being processed.</p>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 4px; margin: 20px 0;">
          <h2 style="margin-top: 0;">Order Details</h2>
          <p><strong>Order Number:</strong> ${orderNumber}</p>
          <p><strong>Total Amount:</strong> ₹${totalAmount}</p>
        </div>

        <h3>Items Ordered:</h3>
        <div style="border: 1px solid #ddd; border-radius: 4px;">
          ${items.map(item => `
            <div style="padding: 15px; border-bottom: 1px solid #eee;">
              <strong>${item.product.title}</strong><br>
              Quantity: ${item.quantity} × ₹${item.price} = ₹${item.quantity * item.price}
            </div>
          `).join('')}
        </div>

        <h3>Shipping Address:</h3>
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 4px;">
          ${shippingAddress.fullName}<br>
          ${shippingAddress.address}<br>
          ${shippingAddress.locality}, ${shippingAddress.city}<br>
          ${shippingAddress.state} - ${shippingAddress.pincode}<br>
          Phone: ${shippingAddress.mobile}
        </div>

        <p>We'll send you an email when your order ships.</p>
        <p>Best regards,<br>The CuBIT Team</p>
      </div>
    `
  })
};

export const sendEmail = async ({ to, subject, template, data, html, text }) => {
  try {
    // Skip email sending if disabled in development
    if (process.env.DISABLE_EMAIL === 'true') {
      console.log('Email sending disabled in development mode');
      console.log(`Would send email to: ${to}`);
      console.log(`Subject: ${subject || (template && templates[template] ? templates[template](data).subject : 'No subject')}`);
      return { messageId: 'dev-disabled', accepted: [to] };
    }

    let emailContent = {};

    if (template && templates[template]) {
      emailContent = templates[template](data);
    } else {
      emailContent = { subject, html, text };
    }

    const mailOptions = {
      from: process.env.FROM_EMAIL || 'noreply@cubit.com',
      to,
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text
    };

    const result = await transporter.sendMail(mailOptions);
    
    if (process.env.NODE_ENV !== 'production') {
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(result));
    }

    return result;
  } catch (error) {
    console.error('Email sending error:', error);
    throw new Error('Failed to send email');
  }
};

export const sendBulkEmail = async (emails) => {
  try {
    const promises = emails.map(email => sendEmail(email));
    return await Promise.allSettled(promises);
  } catch (error) {
    console.error('Bulk email sending error:', error);
    throw new Error('Failed to send bulk emails');
  }
};
