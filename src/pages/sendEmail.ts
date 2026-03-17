import type { APIRoute } from "astro";
import { sendEmailMessage } from "../lib/sendEmailMessage";

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    const body = await request.json();
    const success = await sendEmailMessage({
      name: body.name,
      email: body.email,
      subject: body.subject,
      message: body.message,
    });
    
    if (success) {
      return new Response(
        JSON.stringify({
          message: "Email sent successfully",
        }),
        {
          status: 200,
        }
      );
    } else {
      return new Response(
        JSON.stringify({
          message: "Failed to send email",
        }),
        {
          status: 500,
        }
      );
    }
  }
  return new Response(null, { status: 400 });
};
