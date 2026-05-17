const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, html) => {
  console.log('===========================================');
  console.log('📧 EMAIL SERVICE - Starting email send');
  console.log('📧 To:', to);
  console.log('📧 Subject:', subject);
  console.log('===========================================');

  // Check environment variables
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  console.log('📧 EMAIL_USER exists:', !!emailUser);
  console.log('📧 EMAIL_PASS exists:', !!emailPass);

  if (!emailUser || !emailPass) {
    console.error('❌ Missing EMAIL_USER or EMAIL_PASS in environment variables');
    return { success: false, error: 'Email configuration missing', code: 'MISSING_CONFIG' };
  }

  try {
    // Create transporter with EXPLICIT SMTP config (not service: "gmail")
    console.log('📧 Creating SMTP transporter...');
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // false for port 587 (STARTTLS)
      auth: {
        user: emailUser,
        pass: emailPass
      },
      tls: {
        rejectUnauthorized: false // Required for some networks
      },
      connectionTimeout: 30000,  // 30 seconds
      greetingTimeout: 30000,    // 30 seconds
      socketTimeout: 60000       // 60 seconds
    });

    console.log('📧 Transporter created with SMTP config');

    // Verify transporter with timeout - give plenty of time for cold starts
    console.log('📧 Verifying SMTP transporter (30s timeout)...');
    await Promise.race([
      transporter.verify(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('SMTP verify timeout after 30s')), 30000)
      )
    ]);
    console.log('✅ SMTP transporter verified successfully');

    // Send email with timeout - give plenty of time for cold starts
    console.log('📧 Sending email (60s timeout)...');
    const info = await Promise.race([
      transporter.sendMail({
        from: `"Saptraj Industries" <${emailUser}>`,
        to,
        subject,
        html
      }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Email send timeout after 60s')), 60000)
      )
    ]);

    console.log('✅ Email sent successfully!');
    console.log('📧 Message ID:', info.messageId);
    console.log('📧 Accepted:', info.accepted);
    console.log('📧 Rejected:', info.rejected);
    console.log('===========================================');

    return { success: true, messageId: info.messageId, accepted: info.accepted };

  } catch (error) {
    console.error('===========================================');
    console.error('❌ EMAIL SERVICE - Error occurred:');
    console.error('❌ Error name:', error.name);
    console.error('❌ Error message:', error.message);
    console.error('❌ Error code:', error.code);
    console.error('❌ Error response:', error.response);
    console.error('❌ Error stack:', error.stack);
    console.error('===========================================');

    return { 
      success: false, 
      error: error.message,
      code: error.code || 'SMTP_ERROR'
    };
  }
};

module.exports = sendEmail;