export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Request body:", body);
    const { selectedUserIdx, selectedVehicleIdx } = body;
    if (
      typeof selectedUserIdx !== "number" ||
      typeof selectedVehicleIdx !== "number"
    ) {
      return new NextResponse("Invalid input", { status: 400 });
    }

    console.log("Selected User Index:", selectedUserIdx);
    console.log("Selected Vehicle Index:", selectedVehicleIdx);

    // Get absolute paths for template and font
    const templatePath = path.join(process.cwd(), "public", "template.pdf");
    const fontPath = path.join(
      process.cwd(),
      "public",
      "fonts",
      "amiri",
      "Amiri-Bold.ttf"
    );
    const notoFontPath = path.join(
      process.cwd(),
      "public",
      "fonts",
      "noto",
      "NotoSansSymbols2-Regular.ttf"
    );

    // Read files from disk
    const [existingPdfBytes, fontBytes, notoFontBytes] = await Promise.all([
      fs.readFile(templatePath),
      fs.readFile(fontPath),
      fs.readFile(notoFontPath),
    ]);

    // Load PDF and register fontkit
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    pdfDoc.registerFontkit(fontkit);
    const customFont = await pdfDoc.embedFont(fontBytes);
    const notoFont = await pdfDoc.embedFont(notoFontBytes);
    const page = pdfDoc.getPage(0);

    // Get form data for selected user and vehicle
    const formData = getFormData(selectedUserIdx, selectedVehicleIdx);
    const todayMiladi = getFormattedDate();

    // Draw Arabic text fields
    page.drawText(shapeArabic(todayMiladi), {
      x: 90,
      y: 777,
      size: 14,
      font: customFont,
    });
    page.drawText(shapeArabic(todayMiladi), {
      x: 410,
      y: 695,
      size: 14,
      font: customFont,
    });
    page.drawText(shapeArabic(formData.duration), {
      x: 290,
      y: 695,
      size: 14,
      font: customFont,
    });
    page.drawText(shapeArabic(formData.hours), {
      x: 212,
      y: 696,
      size: 14,
      font: customFont,
    });
    page.drawText(shapeArabic(formData.city), {
      x: 100,
      y: 698,
      size: 14,
      font: customFont,
    });
    page.drawText(shapeArabic(formData.name), {
      x: 395,
      y: 650,
      size: 14,
      font: customFont,
    });
    page.drawText(shapeArabic(formData.birthDay), {
      x: 62,
      y: 652,
      size: 14,
      font: customFont,
    });
    page.drawText(shapeArabic(formData.nationalId), {
      x: 225,
      y: 650,
      size: 14,
      font: customFont,
    });
    page.drawText(shapeArabic(formData.benifAdministration), {
      x: 381,
      y: 627,
      size: 14,
      font: customFont,
    });
    page.drawText(shapeArabic(formData.AdministrationDirector), {
      x: 220,
      y: 628,
      size: 14,
      font: customFont,
    });
    page.drawText(shapeArabic(formData.userPhone), {
      x: 110,
      y: 588,
      size: 14,
      font: customFont,
    });
    page.drawText(shapeArabic(formData.vehiclePlateNumber), {
      x: 500,
      y: 540,
      size: 12,
      font: customFont,
    });
    page.drawText(shapeArabic(formData.vehicleType), {
      x: 430,
      y: 543,
      size: 12,
      font: customFont,
    });
    page.drawText(shapeArabic(formData.vehicleBrand), {
      x: 345,
      y: 543,
      size: 12,
      font: customFont,
    });
    page.drawText(shapeArabic(formData.vehicleColor), {
      x: 290,
      y: 543,
      size: 12,
      font: customFont,
    });
    page.drawText(shapeArabic(formData.vehicleModel), {
      x: 205,
      y: 543,
      size: 12,
      font: customFont,
    });
    page.drawText(shapeArabic(formData.chassisNumber), {
      x: 65,
      y: 543,
      size: 12,
      font: customFont,
    });

    page.drawText(shapeArabic(formData.km), {
      x: 65,
      y: 500,
      size: 16,
      font: customFont,
    });

    checkMarkCoordinates.forEach((coord) => {
      page.drawText("✓", {
        x: coord.x,
        y: coord.y,
        size: 16,
        font: notoFont,
      });
    });
    const pdfBytes = await pdfDoc.save();

    // Return the PDF directly in the response
    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=generate.pdf"
      }
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    // Return the error message in the response for easier debugging
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import path from "path";
import fs from "fs/promises";
import { getFormData, checkMarkCoordinates } from "@/constants/formData";

import { getFormattedDate } from "@/utils/getFormattedDate";
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
    const notoFontPath = path.join(
      process.cwd(),
      "public",
      "fonts",
      "noto",
      "NotoSansSymbols2-Regular.ttf"
    );

    // Read files from disk
    const [existingPdfBytes, fontBytes, notoFontBytes] = await Promise.all([
      fs.readFile(templatePath),
      fs.readFile(fontPath),
      fs.readFile(notoFontPath),
    ]);

    // Load PDF and register fontkit
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    pdfDoc.registerFontkit(fontkit);
    const customFont = await pdfDoc.embedFont(fontBytes);
    const notoFont = await pdfDoc.embedFont(notoFontBytes);
    const page = pdfDoc.getPage(0);

    // Demo: use first user and vehicle for GET
    const formData = getFormData(0, 0);
    const todayMiladi = getFormattedDate();
    page.drawText(shapeArabic(todayMiladi), {
      x: 90,
      y: 777,
      size: 14,
      font: customFont,
    });
    page.drawText(shapeArabic(todayMiladi), {
      x: 410,
      y: 695,
      size: 14,
      font: customFont,
    });
    page.drawText(shapeArabic(formData.duration), {
      x: 290,
      y: 695,
      size: 14,
      font: customFont,
    });
    page.drawText(shapeArabic(formData.hours), {
      x: 212,
      y: 696,
      size: 14,
      font: customFont,
    });
    page.drawText(shapeArabic(formData.city), {
      x: 100,
      y: 698,
      size: 14,
      font: customFont,
    });
    page.drawText(shapeArabic(formData.name), {
      x: 395,
      y: 650,
      size: 14,
      font: customFont,
    });
    page.drawText(shapeArabic(formData.birthDay), {
      x: 62,
      y: 652,
      size: 14,
      font: customFont,
    });
    page.drawText(shapeArabic(formData.nationalId), {
      x: 225,
      y: 650,
      size: 14,
      font: customFont,
    });
    page.drawText(shapeArabic(formData.benifAdministration), {
      x: 381,
      y: 627,
      size: 14,
      font: customFont,
    });
    page.drawText(shapeArabic(formData.AdministrationDirector), {
      x: 220,
      y: 628,
      size: 14,
      font: customFont,
    });
    page.drawText(shapeArabic(formData.userPhone), {
      x: 110,
      y: 588,
      size: 14,
      font: customFont,
    });
    page.drawText(shapeArabic(formData.vehiclePlateNumber), {
      x: 500,
      y: 540,
      size: 12,
      font: customFont,
    });
    page.drawText(shapeArabic(formData.vehicleType), {
      x: 430,
      y: 543,
      size: 12,
      font: customFont,
    });
    page.drawText(shapeArabic(formData.vehicleBrand), {
      x: 345,
      y: 543,
      size: 12,
      font: customFont,
    });
    page.drawText(shapeArabic(formData.vehicleColor), {
      x: 290,
      y: 543,
      size: 12,
      font: customFont,
    });
    page.drawText(shapeArabic(formData.vehicleModel), {
      x: 205,
      y: 543,
      size: 12,
      font: customFont,
    });
    page.drawText(shapeArabic(formData.chassisNumber), {
      x: 65,
      y: 543,
      size: 12,
      font: customFont,
    });

    page.drawText(shapeArabic(formData.km), {
      x: 65,
      y: 500,
      size: 16,
      font: customFont,
    });

    checkMarkCoordinates.forEach((coord) => {
      page.drawText("✓", {
        x: coord.x,
        y: coord.y,
        size: 16,
        font: notoFont,
      });
    });
    const pdfBytes = await pdfDoc.save();

    // Return the PDF directly in the response
    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=generate.pdf"
      }
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    // Return the error message in the response for easier debugging
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
