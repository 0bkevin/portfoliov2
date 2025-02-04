<script lang="ts">
  import ContactInput from "./ContactInput.svelte";
  import ContactTextArea from "./ContactTextArea.svelte";
  import ContactButton from "./ContactButton.svelte";
  import { evaluateInputs } from "./utils";
  let status = "toSend";

  let name = "";
  let email = "";
  let subject = "";
  let message = "";
  let errors = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };
  const handleSubmit = async (event: Event) => {
    status = "sending";
    event.preventDefault();
    errors = evaluateInputs(name, email, subject, message);

    const hasErrors = Object.values(errors).some((msg) => msg);

    if (!hasErrors) {
      status = "sending";
      const response = await fetch("/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
        }),
      });
      if (response.status === 200) {
        status = "sent";
        //once the email is sent, we clear the form
        name = "";
        email = "";
        subject = "";
        message = "";

        setTimeout(() => {
          status = "toSend";
        }, 5000);

      } else {
        status = "error";
        setTimeout(() => {
          status = "toSend";
        }, 5000);
      }
    }
    else {
      status = "toSend";
    }
  };
</script>

<form
  on:submit={handleSubmit}
  class="flex flex-col gap-4 w-full"
  name="contactForm"
>
  <div class="space-y-6 mb-6">
    <ContactInput
      name="name"
      label="Name"
      placeholder="How should I call you?"
      error={errors.name}
      type="text"
      bind:value={name}
    />
    <ContactInput
      name="email"
      label="Email"
      error={errors.email}
      placeholder="Where should I reply?"
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
      placeholder="What do you want to tell me?"
      bind:value={message}
    />
  </div>
  <ContactButton {status} />
</form>
