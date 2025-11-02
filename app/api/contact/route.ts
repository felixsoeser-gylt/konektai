import { Resend } from "resend"
import { NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("[v0] RESEND_API_KEY is not configured")
      return NextResponse.json(
        { error: "E-Mail-Service ist nicht konfiguriert. Bitte RESEND_API_KEY hinzufügen." },
        { status: 500 },
      )
    }

    console.log("[v0] Receiving contact form submission...")
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    console.log("[v0] Form data:", { name, email, phone: phone || "N/A", subject: subject || "N/A" })

    // Validate required fields
    if (!name || !email || !message) {
      console.error("[v0] Validation failed: missing required fields")
      return NextResponse.json({ error: "Name, E-Mail und Nachricht sind erforderlich" }, { status: 400 })
    }

    console.log("[v0] Attempting to send email via Resend...")

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "KonektAI Kontaktformular <onboarding@resend.dev>",
      to: ["soeser@konektai.at"], // Changed recipient to business email now that domain is verified
      replyTo: email,
      subject: `Neue Kontaktanfrage: ${subject || "Keine Betreffzeile"}`,
      html: `
        <h2>Neue Kontaktanfrage von KonektAI Website</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone || "Nicht angegeben"}</p>
        <p><strong>Betreff:</strong> ${subject || "Keine Betreffzeile"}</p>
        <h3>Nachricht:</h3>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    })

    if (error) {
      console.error("[v0] Resend API error:", JSON.stringify(error, null, 2))
      return NextResponse.json(
        { error: `Fehler beim Senden der E-Mail: ${error.message || "Unbekannter Fehler"}` },
        { status: 500 },
      )
    }

    console.log("[v0] Email sent successfully:", data)
    return NextResponse.json({ success: true, message: "E-Mail erfolgreich gesendet" }, { status: 200 })
  } catch (error) {
    console.error("[v0] API error:", error)
    console.error("[v0] Error details:", JSON.stringify(error, null, 2))
    return NextResponse.json(
      { error: `Interner Serverfehler: ${error instanceof Error ? error.message : "Unbekannter Fehler"}` },
      { status: 500 },
    )
  }
}
