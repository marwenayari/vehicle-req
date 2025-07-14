import { NextRequest, NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import path from "path";
import fs from "fs/promises";
import { DUMMY_FORM_DATA } from "@/constants/formData";
import reshaper from "arabic-persian-reshaper";

function shapeArabic(text: string) {
  return reshaper.ArabicShaper.convertArabic(text);
}

export async function GET() {
  try {
    // Get absolute paths for template and font
    const templatePath = path.join(process.cwd(), "public", "template.pdf");
    const fontPath = path.join(
      process.cwd(),
      "public",
      "fonts",
      "amiri",
      "Amiri-Bold.ttf"
    );

    // Read files from disk
    const [existingPdfBytes, fontBytes] = await Promise.all([
      fs.readFile(templatePath),
      fs.readFile(fontPath),
    ]);

    // Load PDF and register fontkit
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    pdfDoc.registerFontkit(fontkit);
    const customFont = await pdfDoc.embedFont(fontBytes);
    const page = pdfDoc.getPage(0);

    // Draw Arabic text fields
    page.drawText(shapeArabic(DUMMY_FORM_DATA.date), {
      x: 100,
      y: 777,
      size: 14,
      font: customFont,
    });
    page.drawText(shapeArabic(DUMMY_FORM_DATA.name), {
      x: 395,
      y: 650,
      size: 14,
      font: customFont,
    });
    page.drawText(shapeArabic(DUMMY_FORM_DATA.nationalId), {
      x: 225,
      y: 650,
      size: 14,
      font: customFont,
    });
    page.drawText(shapeArabic(DUMMY_FORM_DATA.benifAdministration), {
      x: 381,
      y: 627,
      size: 14,
      font: customFont,
    });
    page.drawText(shapeArabic(DUMMY_FORM_DATA.AdministrationDirector), {
      x: 220,
      y: 628,
      size: 14,
      font: customFont,
    });
    page.drawText(shapeArabic(DUMMY_FORM_DATA.userPhone), {
      x: 110,
      y: 588,
      size: 14,
      font: customFont,
    });
    page.drawText(shapeArabic(DUMMY_FORM_DATA.phone), {
      x: 110,
      y: 500,
      size: 14,
      font: customFont,
    });

    const pdfBytes = await pdfDoc.save();

    // Save the PDF to /public/generate.pdf
    const outputPath = path.join(process.cwd(), "public", "generate.pdf");
    await fs.writeFile(outputPath, pdfBytes);

    // Return the URL to the generated PDF
    return NextResponse.json({ url: "/generate.pdf" });
  } catch (error) {
    console.error("PDF generation error:", error);
    return new NextResponse("PDF generation failed", { status: 500 });
  }
}
