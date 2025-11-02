import { Resend } from "resend"
import { NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, E-Mail und Nachricht sind erforderlich" }, { status: 400 })
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "KonektAI Kontaktformular <onboarding@resend.dev>", // This will be replaced with your domain
      to: ["soeser@konektai.at"],
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
      console.error("[v0] Resend error:", error)
      return NextResponse.json({ error: "Fehler beim Senden der E-Mail" }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: "E-Mail erfolgreich gesendet" }, { status: 200 })
  } catch (error) {
    console.error("[v0] API error:", error)
    return NextResponse.json({ error: "Interner Serverfehler" }, { status: 500 })
  }
}
