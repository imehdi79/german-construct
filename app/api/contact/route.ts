import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/schemas/contact";
import type { ContactSchema } from "@/schemas/contact";
import { sendMail, escapeHtml, renderRows, collectAttachments, NOTIFY_TO } from "@/lib/email";
import type { FormValues } from "@/components/Form-Builder/types";

function skippedNote(skipped: string[]): string {
  return skipped.length
    ? `\n\nHinweis: Folgende Anhänge wurden wegen der Größenbeschränkung nicht angehängt: ${skipped.join(", ")}.`
    : "";
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const action = String(formData.get("_action") ?? "");

  if (action === "planner") {
    return handlePlanner(formData);
  }
  return handleContact(formData);
}

async function handleContact(formData: FormData) {
  const str = (k: string) => String(formData.get(k) ?? "");
  const parsed = contactSchema.safeParse({
    vorname: str("vorname"),
    nachname: str("nachname"),
    email: str("email"),
    telefon: str("telefon") || undefined,
    betreff: str("betreff"),
    nachricht: str("nachricht"),
    datenschutz: formData.get("datenschutz") === "true",
  } satisfies ContactSchema);

  if (!parsed.success) {
    return NextResponse.json({ success: false, message: "Bitte überprüfen Sie Ihre Eingaben." }, { status: 400 });
  }

  const d = parsed.data;
  const fullName = `${d.vorname} ${d.nachname}`;
  const { text, html } = renderRows([
    ["Name", fullName],
    ["E-Mail", d.email],
    ["Telefon", d.telefon || "Nicht angegeben"],
    ["Betreff", d.betreff],
    ["Nachricht", d.nachricht],
  ]);

  const { attachments, skipped } = await collectAttachments(formData);
  const note = skippedNote(skipped);

  try {
    await sendMail({
      to: NOTIFY_TO,
      subject: `Kontaktanfrage: ${d.betreff}`,
      text: `Neue Kontaktanfrage über die Website:\n\n${text}${note}`,
      html: `<p>Neue Kontaktanfrage über die Website:</p>${html}${note ? `<p>${escapeHtml(note.trim())}</p>` : ""}`,
      replyTo: d.email,
      attachments,
    });
  } catch (error) {
    console.error("Contact notification email failed:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          "Ihre Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns telefonisch.",
      },
      { status: 500 },
    );
  }

  // Confirmation copy — best-effort
  try {
    await sendMail({
      to: d.email,
      subject: "Wir haben Ihre Nachricht erhalten",
      text:
        `Hallo ${fullName},\n\n` +
        "vielen Dank für Ihre Nachricht. Wir haben Ihre Anfrage erhalten.\n\n" +
        `Ihre Angaben zur Übersicht:\n\n${text}\n\n` +
        "Mit freundlichen Grüßen\nIhr Team von Fliesen & Naturstein Aman",
      html:
        `<p>Hallo ${escapeHtml(fullName)},</p>` +
        "<p>vielen Dank für Ihre Nachricht. Wir haben Ihre Anfrage erhalten.</p>" +
        `<p><strong>Ihre Angaben zur Übersicht:</strong></p>${html}` +
        "<p>Mit freundlichen Grüßen<br/>Ihr Team von Fliesen &amp; Naturstein Aman</p>",
    });
  } catch (error) {
    console.error("Contact confirmation email failed (non-fatal):", error);
  }

  return NextResponse.json({
    success: true,
    message: "Vielen Dank für Ihre Nachricht!",
  });
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function handlePlanner(formData: FormData) {
  const projektTyp = String(formData.get("projektTyp") ?? "").trim();

  let values: FormValues = {};
  try {
    values = JSON.parse(String(formData.get("values") ?? "{}")) as FormValues;
  } catch {
    return NextResponse.json(
      { success: false, message: "Ungültige Daten. Bitte versuchen Sie es erneut." },
      { status: 400 },
    );
  }

  const asText = (v: FormValues[string] | undefined): string => (Array.isArray(v) ? v.join(", ") : (v ?? ""));

  const vorname = asText(values["Vorname"]).trim();
  const nachname = asText(values["Nachname"]).trim();
  const email = asText(values["E-Mail Adresse"]).trim();

  if (!projektTyp || !vorname || !nachname || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      {
        success: false,
        message: "Bitte überprüfen Sie Ihre Kontaktdaten und versuchen Sie es erneut.",
      },
      { status: 400 },
    );
  }

  const rows: Array<[string, string]> = [
    ["Projekttyp", projektTyp],
    ...Object.entries(values)
      .map(([label, value]): [string, string] => [label, asText(value)])
      .filter(([, value]) => value.length > 0),
  ];
  const { text, html } = renderRows(rows);

  const { attachments, skipped } = await collectAttachments(formData);
  const note = skippedNote(skipped);

  try {
    await sendMail({
      to: NOTIFY_TO,
      subject: `Projektplaner-Anfrage: ${projektTyp}`,
      text: `Neue Projektplaner-Anfrage über die Website:\n\n${text}${note}`,
      html: `<p>Neue Projektplaner-Anfrage über die Website:</p>${html}${
        note ? `<p>${escapeHtml(note.trim())}</p>` : ""
      }`,
      replyTo: email,
      attachments,
    });
  } catch (error) {
    console.error("Planner inquiry email failed:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Ihre Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    success: true,
    message: "Vielen Dank! Wir melden uns mit Ihrem unverbindlichen Angebot.",
  });
}
