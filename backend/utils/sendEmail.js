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
    return { success: false, error: 'Email configuration missing' };
  }

  try {
    // Create transporter with timeout protection
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass
      },
      connectionTimeout: 10000, // 10 seconds
      greetingTimeout: 10000,   // 10 seconds
      socketTimeout: 15000       // 15 seconds
    });

    console.log('📧 Transporter created with timeout config');

    // Verify transporter with timeout
    console.log('📧 Verifying transporter...');
    await Promise.race([
      transporter.verify(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Transporter verify timeout')), 8000)
      )
    ]);
    console.log('✅ Transporter verified successfully');

    // Send email with timeout
    console.log('📧 Sending email...');
    const info = await Promise.race([
      transporter.sendMail({
        from: `"Saptraj Industries" <${emailUser}>`,
        to,
        subject,
        html
      }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Email send timeout')), 12000)
      )
    ]);

    console.log('✅ Email sent successfully!');
    console.log('📧 Message ID:', info.messageId);
    console.log('===========================================');

    return { success: true, messageId: info.messageId };

  } catch (error) {
    console.error('===========================================');
    console.error('❌ EMAIL SERVICE - Error occurred:');
    console.error('❌ Error name:', error.name);
    console.error('❌ Error message:', error.message);
    console.error('❌ Error code:', error.code);
    console.error('❌ Error stack:', error.stack);
    console.error('===========================================');

    return { 
      success: false, 
      error: error.message,
      code: error.code 
    };
  }
};

module.exports = sendEmail;