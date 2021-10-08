import whatsapp from "../../../../whatsapp";

export default async function whatsappConnect(request, response) {
  try {
    const state = whatsapp.state;

    if (state == "connecting") {
      return response
        .status(200)
        .json({ ok: true, message: "Session started" });
    }

    whatsapp.connect();
    return response.status(200).json({ ok: true, message: "Session started" });
  } catch (error) {
    return response
      .status(400)
      .json({ ok: false, message: "Error starting whatsapp session" });
  }
}
