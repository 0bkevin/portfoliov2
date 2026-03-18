<script lang="ts">
  import { Turnstile } from "svelte-turnstile";
  import ContactInput from "./ContactInput.svelte";
  import ContactTextArea from "./ContactTextArea.svelte";
  import ContactButton from "./ContactButton.svelte";
  import { evaluateInputs, sanitizeInput } from "./utils";
  let status = "toSend";

  let name = "";
  let email = "";
  let subject = "";
  let message = "";
  let turnstileToken = "";
  let turnstileError = "";
  let resetTurnstile: () => void;
  let errors = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };
  let hasSubmitted = false;

  const TURNSTILE_SITE_KEY = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY || (import.meta.env.DEV ? "1x00000000000000000000AA" : "");

  $: if (hasSubmitted) {
    errors = evaluateInputs(name, email, subject, message);
  }

  const handleTurnstile = (e: CustomEvent<{ token: string }>) => {
    turnstileToken = e.detail.token;
    turnstileError = ""; // Clear error when token is received
  };

  const handleTurnstileError = () => {
    turnstileError = "Turnstile verification failed. Please try again.";
  };

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    hasSubmitted = true;
    
    if (!turnstileToken) {
      turnstileError = "Please complete the CAPTCHA verification.";
      return;
    }

    status = "sending";
    
    errors = evaluateInputs(name, email, subject, message);
    const hasErrors = Object.values(errors).some((msg) => msg);

    if (!hasErrors) {
      try {
        const response = await fetch("/sendEmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            name: sanitizeInput(name), 
            email: sanitizeInput(email), 
            subject: sanitizeInput(subject), 
            message: sanitizeInput(message),
            turnstileToken
          }),
        });
        
        if (response.ok) {
          status = "sent";
          name = "";
          email = "";
          subject = "";
          message = "";
          hasSubmitted = false;
        } else {
          status = "error";
        }
      } catch (error) {
        status = "error";
      } finally {
        if (resetTurnstile) resetTurnstile();
        turnstileToken = "";
        setTimeout(() => { status = "toSend"; }, 5000);
      }
    } else {
      status = "toSend";
    }
  };
</script>

<form
  on:submit={handleSubmit}
  class="flex flex-col gap-6 w-full"
  name="contactForm"
>
  <ContactInput
    name="name"
    label="Name"
    placeholder="Your name"
    error={errors.name}
    type="text"
    bind:value={name}
  />
  <ContactInput
    name="email"
    label="Email"
    error={errors.email}
    placeholder="Your email"
    type="email"
    bind:value={email}
  />

  <ContactInput
    name="subject"
    label="Subject"
    placeholder="What is this about?"
    error={errors.subject}
    type="text"
    bind:value={subject}
  />

  <ContactTextArea
    name="message"
    label="Message"
    error={errors.message}
    placeholder="Tell me about your project or inquiry..."
    bind:value={message}
  />

  <div class="flex flex-col items-center w-full gap-2">
    <Turnstile 
      siteKey={TURNSTILE_SITE_KEY} 
      on:callback={handleTurnstile}
      on:error={handleTurnstileError}
      bind:reset={resetTurnstile}
    />
    {#if turnstileError}
      <span class="text-sm text-red-500">{turnstileError}</span>
    {/if}
  </div>

  <div class="pt-1">
    <ContactButton {status} />
  </div>
</form>
