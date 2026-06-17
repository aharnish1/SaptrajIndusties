const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, html) => {
  console.log('===========================================');
  console.log('📧 EMAIL SERVICE - Starting email send');
  console.log('📧 To:', to);
  console.log('📧 Subject:', subject);
  console.log('===========================================');

  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  console.log('📧 EMAIL_USER exists:', !!emailUser);
  console.log('📧 EMAIL_PASS exists:', !!emailPass);

  if (!emailUser || !emailPass) {
    console.error('❌ Missing EMAIL_USER or EMAIL_PASS');
    return {
      success: false,
      error: 'Email configuration missing',
      code: 'MISSING_CONFIG'
    };
  }

  try {
    console.log('📧 Creating SMTP transporter...');

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: emailUser,
        pass: emailPass
      }
    });

    console.log('📧 Sending email...');

    const info = await transporter.sendMail({
      from: `"Saptraj Industries" <${emailUser}>`,
      to,
      subject,
      html
    });

    console.log('✅ Email sent successfully');
    console.log(info);

    return {
      success: true,
      messageId: info.messageId
    };

  } catch (error) {
    console.error('===========================================');
    console.error('❌ EMAIL ERROR');
    console.error(error);
    console.error('===========================================');

    return {
      success: false,
      error: error.message,
      code: error.code
    };
  }
};

module.exports = sendEmail;