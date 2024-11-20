const GOOGLE_APPSCRIPT_LINK = import.meta.env.GOOGLE_APPSCRIPT_LINK;
export const sendEmailMessage = async (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  try {
    const response = await fetch(GOOGLE_APPSCRIPT_LINK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(response);
    const result = await response.json();
    console.log(result);
    if (result.status === "success") return true;
    else return false;
  } catch (error: any) {
    return error.message;
  }
};
