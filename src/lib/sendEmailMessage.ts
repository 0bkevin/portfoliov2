export const sendEmailMessage = async (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;
  // Fallback to the same email or a designated one if MY_EMAIL_ADDRESS is not set
  const MY_EMAIL_ADDRESS = import.meta.env.MY_EMAIL_ADDRESS || "delivered@resend.dev"; 

  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set in environment variables.");
    return false;
  }

  const htmlContent = `
    <h2>New Contact Form Message</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Subject:</strong> ${data.subject}</p>
    <br/>
    <p><strong>Message:</strong></p>
    <p>${data.message.replace(/\n/g, '<br/>')}</p>
  `;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        // For the free tier without a verified domain, you must send from onboarding@resend.dev
        // and send to the email address registered with your Resend account.
        from: "kevin@email.rodolfomedinadelrio.com",
        to: MY_EMAIL_ADDRESS,
        reply_to: data.email,
        subject: `Contact Form: ${data.subject}`,
        html: htmlContent,
      }),
    });

    const result = await response.json();

    if (response.ok && result.id) {
      console.log("Email sent successfully with Resend ID:", result.id);
      return true;
    } else {
      console.error("Resend API Error:", result);
      return false;
    }
  } catch (error: any) {
    console.error("Error sending email via Resend:", error);
    return false;
  }
};
