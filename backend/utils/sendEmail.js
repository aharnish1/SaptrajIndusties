const { Resend } = require('resend');

const sendEmail = async (to, subject, html) => {
  console.log('===========================================');
  console.log('📧 EMAIL SERVICE (Resend) - Starting email send');
  console.log('📧 To:', to);
  console.log('📧 Subject:', subject);
  console.log('===========================================');

  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    console.error('❌ Missing RESEND_API_KEY environment variable');
    return {
      success: false,
      error: 'Email configuration missing',
      code: 'MISSING_CONFIG'
    };
  }

  if (!to || !subject || !html) {
    console.error('❌ Missing required email fields (to, subject, html)');
    return {
      success: false,
      error: 'Missing required parameters',
      code: 'INVALID_PARAMETERS'
    };
  }

  try {
    const resend = new Resend(resendApiKey);

    console.log('📧 Sending email via Resend API...');

    const fromEmail = process.env.RESEND_FROM_EMAIL || 'Saptraj Industries <onboarding@resend.dev>';

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to,
      subject,
      html
    });

    if (error) {
      console.error('===========================================');
      console.error('❌ RESEND API ERROR');
      console.error(error);
      console.error('===========================================');
      return {
        success: false,
        error: error.message || 'Resend API returned an error',
        code: error.name || 'RESEND_ERROR'
      };
    }

    console.log('✅ Email sent successfully via Resend');
    console.log('📧 Message ID:', data.id);

    return {
      success: true,
      messageId: data.id
    };

  } catch (error) {
    console.error('===========================================');
    console.error('❌ EMAIL ERROR (Exception)');
    console.error(error);
    console.error('===========================================');

    return {
      success: false,
      error: error.message || 'Unknown network or service failure',
      code: error.code || 'NETWORK_FAILURE'
    };
  }
};

module.exports = sendEmail;