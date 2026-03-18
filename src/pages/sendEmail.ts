import type { APIRoute } from "astro";
import { sendEmailMessage } from "../lib/sendEmailMessage";

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    const body = await request.json();

    // Verify Cloudflare Turnstile token
    const turnstileToken = body.turnstileToken;
    const TURNSTILE_SECRET_KEY = import.meta.env.TURNSTILE_SECRET_KEY || (import.meta.env.DEV ? "1x0000000000000000000000000000000AA" : "");
    
    if (!turnstileToken) {
      return new Response(
        JSON.stringify({ message: "Turnstile token is missing." }),
        { status: 400 }
      );
    }

    try {
      const ip = request.headers.get("CF-Connecting-IP");
      const formData = new FormData();
      formData.append("secret", TURNSTILE_SECRET_KEY);
      formData.append("response", turnstileToken);
      if (ip) {
        formData.append("remoteip", ip);
      }

      const turnstileResponse = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        body: formData,
      });

      const turnstileResult = await turnstileResponse.json();

      if (!turnstileResult.success) {
        return new Response(
          JSON.stringify({ message: "Failed Turnstile verification." }),
          { status: 400 }
        );
      }
    } catch (err) {
      return new Response(
        JSON.stringify({ message: "Error verifying Turnstile token." }),
        { status: 500 }
      );
    }

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
