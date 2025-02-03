import type { APIRoute } from "astro";
import { sendEmailMessage } from "../lib/sendEmailMessage";

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    const body = await request.json();
    await sendEmailMessage({
      name: body.name,
      email: body.email,
      subject: body.subject,
      message: body.message,
    });
    return new Response(
      JSON.stringify({
        message: "Email sent successfully",
      }),
      {
        status: 200,
      }
    );
  }
  return new Response(null, { status: 400 });
};
