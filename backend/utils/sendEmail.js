const nodemailer = require('nodemailer');

/**
 * Send email using Nodemailer
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} html - HTML content of the email
 * @returns {Promise<Object>} - Result object with success status
 */
const sendEmail = async (to, subject, html) => {
  try {
    console.log('📧 Email Service - Starting email send');
    console.log('📧 Email Service - To:', to);
    console.log('📧 Email Service - Subject:', subject);
    console.log('📧 Email Service - EMAIL_USER exists:', !!process.env.EMAIL_USER);
    console.log('📧 Email Service - EMAIL_PASS exists:', !!process.env.EMAIL_PASS);
    console.log('📧 Email Service - EMAIL_USER value:', process.env.EMAIL_USER?.substring(0, 5) + '...');

    // Create transporter using environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: process.env.EMAIL_PORT || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    console.log('📧 Email Service - Transporter created');

    // Verify transporter configuration
    console.log('📧 Email Service - Verifying transporter...');
    await transporter.verify();
    console.log('📧 Email Service - Transporter verified successfully');

    // Send email
    console.log('📧 Email Service - Sending email...');
    const info = await transporter.sendMail({
      from: `"Saptraj Industries" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    });

    console.log('✅ Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending email:', error);
    console.error('❌ Error code:', error.code);
    console.error('❌ Error response:', error.response);
    console.error('❌ Error command:', error.command);
    return { success: false, error: error.message, code: error.code };
  }
};

module.exports = sendEmail;
