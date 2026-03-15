import 'server-only';
import PDFDocument from 'pdfkit';
import path from 'path';
import { PROGRAMME_LABELS } from './applicationConstants';

type ApplicationForPdf = {
  applicantId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  address: string;
  programmeDuration: string;
  guardianName: string;
  guardianContact: string;
  guardianAddress: string;
};

const MARGIN = 50;
const PAGE_WIDTH = 595;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2; // 495
const CONTENT_LEFT = MARGIN;
const CONTENT_RIGHT = MARGIN + CONTENT_WIDTH;
const LINE_HEIGHT = 13;
const LINE_HEIGHT_BODY = 13;
const SECTION_PAD = 10;
const BOX_PAD = 10;
const SECTION_SPACING = 8;
const ROW_HEIGHT = 32; // taller so text does not touch box borders
const COL_GAP = 12;
const LEFT_COL_WIDTH = (CONTENT_WIDTH - COL_GAP) / 2;
const RIGHT_COL_LEFT = CONTENT_LEFT + LEFT_COL_WIDTH + COL_GAP;
const RIGHT_COL_WIDTH = CONTENT_WIDTH - LEFT_COL_WIDTH - COL_GAP;
const LABEL_ZONE = 92; // space for "Label: " so value does not crash into label
const VALUE_INSET = LABEL_ZONE + 8;
// Typography
const FONT_MAIN_TITLE = 16;
const FONT_SUBTITLE = 11;
const FONT_SECTION_TITLE = 12;
const FONT_LABEL = 9;
const FONT_BODY = 10;
const FONT_SMALL = 9;
const LOGO_WIDTH = 128; // slightly larger, more visible in header
const PAGE_HEIGHT = 842;
const WATERMARK_WIDTH = 200;
const WATERMARK_OPACITY = 0.06; // subtle, not overdesigned
const TOTAL_PAGES = 3; // MANDATORY: document must not exceed 3 pages
// Colors (print-friendly)
const COLOR_LABEL = '#444444';
const COLOR_BLACK = '#000000';
const COLOR_WINE = '#722F37'; // Nestine brand
const TABLE_HEADER_BG = '#e8e8e8';
const TABLE_ROW_ALT = '#f5f5f5';
const FOOTER_Y = PAGE_HEIGHT - 32;
const CELL_PAD_TOP = 8;
const CELL_PAD_BOTTOM = 8;
const TABLE_ROW_HEIGHT = 30; // enough for one line + padding, no border overlap
const SIG_LINE_WIDTH = 1.5; // slightly bold, wine color
const SIGNATURE_LINE_LENGTH = CONTENT_WIDTH; // full width for real handwritten signature (Parent/Guardian, Student/Trainee)
const DATE_LINE_LENGTH = 280; // date field unchanged
const HEADER_SEP_THICKNESS = 2.5; // thick wine separator under header
const GUARDIAN_ROW_HEIGHT = 36; // extra height so borders never cross text
const GUARDIAN_CELL_PAD = 10;
const CEO_BOX_PAD = 14; // internal padding so text does not touch border

export async function generateApplicationPdf(
  app: ApplicationForPdf
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    // Bottom margin 0 so footer at FOOTER_Y does not trigger automatic page break.
    // Exactly 3 pages: we create each page explicitly so header/content/footer stay on same page.
    const pageOptions = {
      size: 'A4' as const,
      margins: { top: MARGIN, bottom: 0, left: MARGIN, right: MARGIN },
    };
    const doc = new PDFDocument({ ...pageOptions, autoFirstPage: false });
    const chunks: Buffer[] = [];

    doc.on('data', (chunk) => chunks.push(chunk as Buffer));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    const logoPath = path.join(process.cwd(), 'public', 'logo.png');

    // ---------- PAGE 1 ----------
    doc.addPage(pageOptions);
    let y = 36;
    drawWatermark(doc, logoPath);

    // Header (logo | title | photo)
    const logoZoneRight = CONTENT_LEFT + LOGO_WIDTH + 12;
    const photoBoxW = 72;
    const photoBoxH = 90;
    const photoLeft = CONTENT_RIGHT - photoBoxW;
    const centerZoneLeft = logoZoneRight;
    const centerZoneWidth = photoLeft - centerZoneLeft;

    try {
      doc.image(logoPath, CONTENT_LEFT, y - 6, { width: LOGO_WIDTH });
    } catch {
      // Logo missing
    }

    doc.rect(photoLeft, y - 2, photoBoxW, photoBoxH).stroke();
    doc
      .fontSize(FONT_SMALL)
      .font('Helvetica')
      .fillColor('#444')
      .text('Attach Passport Photo Here', photoLeft + 6, y + photoBoxH / 2 - 16, {
        width: photoBoxW - 12,
        align: 'center',
      })
      .fillColor('black');

    doc.fontSize(FONT_MAIN_TITLE).font('Helvetica-Bold');
    doc.text('NESTINE DESIGNS', centerZoneLeft, y + 2, {
      width: centerZoneWidth,
      align: 'center',
    });
    doc.fontSize(FONT_SUBTITLE).font('Helvetica');
    doc.text('Fashion Training Institute', centerZoneLeft, y + 22, {
      width: centerZoneWidth,
      align: 'center',
    });
    doc.fontSize(FONT_SECTION_TITLE).font('Helvetica-Bold');
    doc.text('TRAINING ADMISSION FORM', centerZoneLeft, y + 38, {
      width: centerZoneWidth,
      align: 'center',
    });

    const headerBottomY = y + photoBoxH + 6;
    doc.strokeColor(COLOR_WINE).lineWidth(HEADER_SEP_THICKNESS).moveTo(CONTENT_LEFT, headerBottomY).lineTo(CONTENT_RIGHT, headerBottomY).stroke().strokeColor(COLOR_BLACK).lineWidth(1);
    y = headerBottomY + 10;

    // Instructions (one line)
    doc.fontSize(FONT_SMALL).font('Helvetica').fillColor(COLOR_LABEL);
    doc.text('Please complete all sections. Submit this form as instructed.', CONTENT_LEFT, y);
    doc.fillColor(COLOR_BLACK);
    y += LINE_HEIGHT + 2;

    // Application ID (prominent)
    doc.fontSize(11).font('Helvetica-Bold').fillColor(COLOR_BLACK);
    doc.text(`Application ID: ${app.applicantId}`, CONTENT_LEFT, y);
    y += LINE_HEIGHT + 6;

    // ---------- SECTION 1: APPLICANT INFORMATION ----------
    const section1Y = y;
    doc.fontSize(FONT_SECTION_TITLE).font('Helvetica-Bold');
    doc.text('1. Applicant Information', CONTENT_LEFT + BOX_PAD, y + 6);
    y += 24;

    const leftValW = LEFT_COL_WIDTH - VALUE_INSET - 8;
    const rightValW = RIGHT_COL_WIDTH - VALUE_INSET - 8;

    y = formRowTwoCol(
      doc,
      y,
      'First Name',
      app.firstName,
      'Email',
      app.email,
      leftValW,
      rightValW
    );
    y = formRowTwoCol(
      doc,
      y,
      'Last Name',
      app.lastName,
      'Phone Number',
      app.phone,
      leftValW,
      rightValW
    );
    y = formRowTwoCol(
      doc,
      y,
      'Date of Birth',
      app.dateOfBirth,
      'Programme Duration',
      PROGRAMME_LABELS[app.programmeDuration] ?? app.programmeDuration,
      leftValW,
      rightValW
    );

    const addrValW = CONTENT_WIDTH - VALUE_INSET - BOX_PAD - 8;
    const addrTextH = doc.heightOfString(app.address, { width: addrValW });
    const addrH = Math.max(ROW_HEIGHT, addrTextH + CELL_PAD_TOP + CELL_PAD_BOTTOM);
    doc.strokeColor(COLOR_BLACK).rect(CONTENT_LEFT, y, CONTENT_WIDTH, addrH).stroke();
    doc.fontSize(FONT_LABEL).font('Helvetica').fillColor(COLOR_LABEL);
    doc.text('Residential Address: ', CONTENT_LEFT + 10, y + CELL_PAD_TOP, { width: LABEL_ZONE });
    doc.fillColor(COLOR_BLACK).fontSize(FONT_BODY).text(app.address, CONTENT_LEFT + VALUE_INSET, y + CELL_PAD_TOP, { width: addrValW });
    y += addrH + 2;

    doc.rect(CONTENT_LEFT, section1Y, CONTENT_WIDTH, y - section1Y).stroke();
    y += SECTION_SPACING;

    // ---------- SECTION 2: PARENT / GUARDIAN INFORMATION ----------
    const section2Y = y;
    doc.fontSize(FONT_SECTION_TITLE).font('Helvetica-Bold');
    doc.text('2. Parent / Guardian Information', CONTENT_LEFT + BOX_PAD, y + 6);
    y += 24;

    const fullValW = CONTENT_WIDTH - VALUE_INSET - BOX_PAD - 8;
    y = formRowFull(doc, y, 'Parent/Guardian Name', app.guardianName, fullValW, GUARDIAN_ROW_HEIGHT, true);
    y = formRowFull(doc, y, 'Guardian Contact Number', app.guardianContact, fullValW, GUARDIAN_ROW_HEIGHT, true);
    doc.fontSize(FONT_BODY).font('Helvetica');
    const guardAddrH = Math.max(
      GUARDIAN_ROW_HEIGHT,
      doc.heightOfString(app.guardianAddress, { width: fullValW }) + GUARDIAN_CELL_PAD * 2
    );
    y = formRowFull(doc, y, 'Guardian Address', app.guardianAddress, fullValW, guardAddrH, true);

    doc.rect(CONTENT_LEFT, section2Y, CONTENT_WIDTH, y - section2Y).stroke();
    y += SECTION_SPACING;

    // ---------- SECTION 3: ADMISSION FEES ----------
    doc.fontSize(FONT_SECTION_TITLE).font('Helvetica-Bold');
    doc.text('3. Admission Fees', CONTENT_LEFT, y);
    y += 18;

    const colProg = CONTENT_WIDTH * 0.68;
    const colFee = CONTENT_WIDTH * 0.32;
    const th = TABLE_ROW_HEIGHT;
    // Table header
    doc.fillColor(TABLE_HEADER_BG).strokeColor(COLOR_BLACK);
    doc.rect(CONTENT_LEFT, y, colProg, th).fillAndStroke();
    doc.rect(CONTENT_LEFT + colProg, y, colFee, th).fillAndStroke();
    doc.fontSize(FONT_BODY).font('Helvetica-Bold').fillColor(COLOR_BLACK);
    doc.text('Programme Duration', CONTENT_LEFT + 10, y + CELL_PAD_TOP, { width: colProg - 20 });
    doc.text('Fee (GHS)', CONTENT_LEFT + colProg + 10, y + CELL_PAD_TOP, { width: colFee - 20 });
    y += th;

    const feeRows: [string, string][] = [
      ['6 Months Training', '2,500'],
      ['1 Year Training', '3,000'],
      ['1.5 Years Training', '3,500'],
    ];
    feeRows.forEach(([prog, fee], i) => {
      doc.fillColor(i % 2 === 1 ? TABLE_ROW_ALT : 'white').strokeColor(COLOR_BLACK);
      doc.rect(CONTENT_LEFT, y, colProg, th).fillAndStroke();
      doc.rect(CONTENT_LEFT + colProg, y, colFee, th).fillAndStroke();
      doc.fontSize(FONT_BODY).font('Helvetica').fillColor(COLOR_BLACK);
      doc.text(prog, CONTENT_LEFT + 10, y + CELL_PAD_TOP, { width: colProg - 20 });
      doc.text(fee, CONTENT_LEFT + colProg + 10, y + CELL_PAD_TOP, { width: colFee - 20 });
      y += th;
    });
    y += 4;
    doc.fontSize(FONT_SMALL).font('Helvetica').fillColor(COLOR_LABEL);
    doc.text('All amounts in GHS. The application form fee (GHS 200) is non-refundable and separate from programme fees.', CONTENT_LEFT, y, { width: CONTENT_WIDTH });
    doc.fillColor(COLOR_BLACK);
    y += LINE_HEIGHT + 6;

    // ---------- SECTION 4: IMPORTANT INFORMATION ----------
    const importantText =
      'Graduation fees must be paid before completion of the programme. Students must complete a 3-month internship before graduation. Certificates will be awarded based on demonstrated competence. After completion of the programme, graduates may be employed in this enterprise or elsewhere. The GHS 200 application form fee is non-refundable and is not deducted from the training fee.';
    doc.fontSize(FONT_BODY).font('Helvetica');
    const importantInnerW = CONTENT_WIDTH - BOX_PAD * 2;
    const importantTextH = doc.heightOfString(importantText, { width: importantInnerW });
    const importantTitleH = 22;
    const importantBoxH = importantTitleH + importantTextH + BOX_PAD * 2;
    const importantY = y;
    doc.rect(CONTENT_LEFT, importantY, CONTENT_WIDTH, importantBoxH).stroke();
    doc.fontSize(FONT_SECTION_TITLE).font('Helvetica-Bold');
    doc.text('4. Important Information', CONTENT_LEFT + BOX_PAD, importantY + 8);
    doc.fontSize(FONT_BODY).font('Helvetica');
    doc.text(importantText, CONTENT_LEFT + BOX_PAD, importantY + importantTitleH + BOX_PAD, {
      width: importantInnerW,
    });
    y = importantY + importantBoxH + SECTION_SPACING;

    drawPageFooter(doc, 1, TOTAL_PAGES);
    // ---------- PAGE 2 ----------
    doc.addPage(pageOptions);
    drawWatermark(doc, logoPath);
    y = MARGIN + 4;

    // Equipment Needed for Starting
    const equipY = y;
    doc.fontSize(FONT_SECTION_TITLE).font('Helvetica-Bold');
    doc.text('5. Equipment Needed for Starting', CONTENT_LEFT + BOX_PAD, y + 6);
    y += 22;

    const equipment = [
      'Tape measure',
      'Pair of scissors',
      'Pinking shears',
      'Cutter and seam ripper',
      'Grey baft (at least 5 yards)',
      'Brown papers',
      'Curves',
      'Machine and hemming needles',
      'Ball pins',
      'Specimen album',
      "Tailor's chalk",
      'Pencil',
      'Rule',
      'Thread',
    ];
    doc.fontSize(FONT_BODY).font('Helvetica');
    equipment.forEach((item) => {
      doc.text(`•  ${item}`, CONTENT_LEFT + BOX_PAD + 6, y, {
        width: CONTENT_WIDTH - BOX_PAD * 2 - 12,
      });
      y += LINE_HEIGHT_BODY;
    });
    y += BOX_PAD;

    doc.rect(CONTENT_LEFT, equipY, CONTENT_WIDTH, y - equipY).stroke();
    y += SECTION_SPACING;

    // Prescribed Uniform
    const uniformY = y;
    doc.fontSize(FONT_SECTION_TITLE).font('Helvetica-Bold');
    doc.text('6. Prescribed Uniform', CONTENT_LEFT + BOX_PAD, y + 6);
    y += 22;

    doc.fontSize(FONT_BODY).font('Helvetica-Bold');
    doc.text('Mondays & Tuesdays:', CONTENT_LEFT + BOX_PAD, y);
    y += LINE_HEIGHT_BODY + 4;
    doc.font('Helvetica');
    doc.text(
      'White Jacket with black inner and strictly black or white sneakers.',
      CONTENT_LEFT + BOX_PAD + 8,
      y,
      { width: CONTENT_WIDTH - BOX_PAD * 2 - 16 }
    );
    y += LINE_HEIGHT_BODY + 8;
    doc.font('Helvetica-Bold');
    doc.text('Wednesdays to Fridays:', CONTENT_LEFT + BOX_PAD, y);
    y += LINE_HEIGHT_BODY + 2;
    doc.font('Helvetica');
    doc.text('Black Apron.', CONTENT_LEFT + BOX_PAD + 8, y, {
      width: CONTENT_WIDTH - BOX_PAD * 2 - 16,
    });
    y += LINE_HEIGHT_BODY + BOX_PAD;

    doc.rect(CONTENT_LEFT, uniformY, CONTENT_WIDTH, y - uniformY).stroke();
    y += SECTION_SPACING;

    // Certification
    const certY = y;
    const certText =
      'Certificates will be awarded based on demonstrated competence upon completion of the programme.';
    doc.fontSize(FONT_BODY).font('Helvetica');
    const certTextH = doc.heightOfString(certText, { width: CONTENT_WIDTH - BOX_PAD * 2 });
    const certBoxH = 22 + certTextH + BOX_PAD * 2;
    doc.rect(CONTENT_LEFT, certY, CONTENT_WIDTH, certBoxH).stroke();
    doc.fontSize(FONT_SECTION_TITLE).font('Helvetica-Bold');
    doc.text('7. Certification', CONTENT_LEFT + BOX_PAD, certY + 8);
    doc.fontSize(FONT_BODY).font('Helvetica');
    doc.text(certText, CONTENT_LEFT + BOX_PAD, certY + 28, {
      width: CONTENT_WIDTH - BOX_PAD * 2,
    });
    y = certY + certBoxH + SECTION_SPACING;

    drawPageFooter(doc, 2, TOTAL_PAGES);
    // ---------- PAGE 3 ----------
    doc.addPage(pageOptions);
    drawWatermark(doc, logoPath);
    y = MARGIN + 4;

    // Rules and Regulations
    doc.fontSize(FONT_SECTION_TITLE).font('Helvetica-Bold');
    doc.text('8. Rules and Regulations', CONTENT_LEFT, y);
    y += 18;

    const rules = [
      'Respect instructors and customers.',
      'No gossiping or insulting behaviour.',
      'Theft leads to dismissal.',
      'Permission required before leaving workplace.',
      'Travel requests must be submitted 2 weeks prior.',
      'Working hours: 8:00 AM – 6:00 PM.',
      'Break time: 12:00 PM – 1:00 PM.',
      'Bathroom slippers not allowed.',
      'No eating while customers are present.',
      'Trainees may stay longer during busy periods.',
      'Failure to comply may result in suspension.',
    ];
    doc.fontSize(FONT_BODY).font('Helvetica');
    rules.forEach((r) => {
      doc.text(`•  ${r}`, CONTENT_LEFT + 8, y, { width: CONTENT_WIDTH - 16 });
      y += LINE_HEIGHT_BODY;
    });
    y += 6;

    // Daily Responsibilities
    doc.fontSize(FONT_SECTION_TITLE).font('Helvetica-Bold');
    doc.text('9. Daily Responsibilities', CONTENT_LEFT, y);
    y += 18;

    const duties = [
      'Mopping the floor.',
      'Cleaning sewing machines.',
      'Sweeping workspace.',
      'Maintaining clean washrooms.',
      'Proper arrangement before leaving.',
      'Mondays are designated for general cleaning.',
    ];
    doc.fontSize(FONT_BODY).font('Helvetica');
    duties.forEach((d) => {
      doc.text(`•  ${d}`, CONTENT_LEFT + 8, y, { width: CONTENT_WIDTH - 16 });
      y += LINE_HEIGHT_BODY;
    });
    y += 8;

    // Signature section — long wine lines, enough space for handwritten signature
    const sigGapAbove = 18;
    const sigGapBelow = 12;
    doc.fontSize(FONT_BODY).font('Helvetica').fillColor(COLOR_LABEL);
    doc.text('Signature of Parent or Guardian', CONTENT_LEFT, y);
    const sigLineY = y + sigGapAbove;
    doc.strokeColor(COLOR_WINE).lineWidth(SIG_LINE_WIDTH).moveTo(CONTENT_LEFT, sigLineY).lineTo(CONTENT_LEFT + SIGNATURE_LINE_LENGTH, sigLineY).stroke();
    y = sigLineY + sigGapBelow;
    doc.fillColor(COLOR_LABEL).text('Signature of Student/Trainee', CONTENT_LEFT, y);
    const sigLineY2 = y + sigGapAbove;
    doc.strokeColor(COLOR_WINE).lineWidth(SIG_LINE_WIDTH).moveTo(CONTENT_LEFT, sigLineY2).lineTo(CONTENT_LEFT + SIGNATURE_LINE_LENGTH, sigLineY2).stroke();
    y = sigLineY2 + sigGapBelow;
    doc.fillColor(COLOR_LABEL).text('Date:', CONTENT_LEFT, y);
    doc.strokeColor(COLOR_WINE).lineWidth(SIG_LINE_WIDTH).moveTo(CONTENT_LEFT + 32, y + sigGapAbove).lineTo(CONTENT_LEFT + 32 + DATE_LINE_LENGTH, y + sigGapAbove).stroke();
    doc.strokeColor(COLOR_BLACK).lineWidth(1);
    y += sigGapAbove + sigGapBelow + 4;

    // CEO Authorization — box with internal padding so text does not touch border
    const ceoY = y;
    doc.fontSize(FONT_SECTION_TITLE).font('Helvetica-Bold').fillColor(COLOR_BLACK);
    doc.text('CEO Authorization:', CONTENT_LEFT + CEO_BOX_PAD, ceoY + CEO_BOX_PAD);
    y = ceoY + CEO_BOX_PAD + 20;
    doc.fontSize(FONT_BODY).font('Helvetica');
    doc.text('Signed', CONTENT_LEFT + CEO_BOX_PAD, y);
    y += LINE_HEIGHT_BODY + 4;
    doc.font('Helvetica-Bold').text('Opuni Ernestina', CONTENT_LEFT + CEO_BOX_PAD, y);
    y += LINE_HEIGHT_BODY + 4;
    doc.font('Helvetica').text('CEO, Nestine Designs', CONTENT_LEFT + CEO_BOX_PAD, y);
    const ceoBoxBottom = y + CEO_BOX_PAD;
    doc.strokeColor(COLOR_BLACK).rect(CONTENT_LEFT, ceoY, CONTENT_WIDTH, ceoBoxBottom - ceoY).stroke();
    y = ceoBoxBottom + SECTION_SPACING;

    // Print note
    doc.fontSize(FONT_SMALL).font('Helvetica').fillColor(COLOR_LABEL);
    doc.text('Please print and submit this form in person or as instructed.', CONTENT_LEFT, y);

    drawPageFooter(doc, 3, TOTAL_PAGES);
    doc.end();
  });
}

function formRowTwoCol(
  doc: PDFKit.PDFDocument,
  y: number,
  labelLeft: string,
  valueLeft: string,
  labelRight: string,
  valueRight: string,
  leftValW: number,
  rightValW: number
): number {
  doc.fontSize(FONT_BODY).font('Helvetica');
  const leftTextH = doc.heightOfString(valueLeft, { width: leftValW });
  const rightTextH = doc.heightOfString(valueRight, { width: rightValW });
  const contentH = Math.max(leftTextH, rightTextH) + CELL_PAD_TOP + CELL_PAD_BOTTOM;
  const boxH = Math.max(ROW_HEIGHT, contentH);

  doc.strokeColor(COLOR_BLACK);
  doc.rect(CONTENT_LEFT, y, LEFT_COL_WIDTH, boxH).stroke();
  doc.rect(RIGHT_COL_LEFT, y, RIGHT_COL_WIDTH, boxH).stroke();
  doc.fontSize(FONT_LABEL).font('Helvetica').fillColor(COLOR_LABEL);
  doc.text(labelLeft + ': ', CONTENT_LEFT + 10, y + CELL_PAD_TOP, { width: LABEL_ZONE });
  doc.fillColor(COLOR_BLACK).fontSize(FONT_BODY).text(valueLeft, CONTENT_LEFT + VALUE_INSET, y + CELL_PAD_TOP, { width: leftValW });
  doc.fontSize(FONT_LABEL).fillColor(COLOR_LABEL).text(labelRight + ': ', RIGHT_COL_LEFT + 10, y + CELL_PAD_TOP, { width: LABEL_ZONE });
  doc.fillColor(COLOR_BLACK).fontSize(FONT_BODY).text(valueRight, RIGHT_COL_LEFT + VALUE_INSET, y + CELL_PAD_TOP, { width: rightValW });

  return y + boxH + 2;
}

function formRowFull(
  doc: PDFKit.PDFDocument,
  y: number,
  label: string,
  value: string,
  valueW: number,
  rowH?: number,
  useGuardianPadding?: boolean
): number {
  const padTop = useGuardianPadding ? GUARDIAN_CELL_PAD : CELL_PAD_TOP;
  const padBottom = useGuardianPadding ? GUARDIAN_CELL_PAD : CELL_PAD_BOTTOM;
  doc.fontSize(FONT_BODY).font('Helvetica');
  const valueH = doc.heightOfString(value, { width: valueW });
  const minH = rowH ?? (useGuardianPadding ? GUARDIAN_ROW_HEIGHT : ROW_HEIGHT);
  const contentHeight = valueH + padTop + padBottom;
  const h = rowH ?? Math.max(minH, contentHeight);
  doc.strokeColor(COLOR_BLACK).rect(CONTENT_LEFT, y, CONTENT_WIDTH, h).stroke();
  doc.fontSize(FONT_LABEL).font('Helvetica').fillColor(COLOR_LABEL);
  doc.text(label + ': ', CONTENT_LEFT + 10, y + padTop, { width: LABEL_ZONE });
  doc.fillColor(COLOR_BLACK).fontSize(FONT_BODY).text(value, CONTENT_LEFT + VALUE_INSET, y + padTop, { width: valueW });
  return y + h + 2;
}

function drawPageFooter(
  doc: PDFKit.PDFDocument,
  pageNum: number,
  totalPages: number
): void {
  doc.fontSize(FONT_SMALL).font('Helvetica').fillColor(COLOR_LABEL);
  // height constrains text so it does not trigger automatic page break (stays on same page)
  doc.text('Nestine Designs Fashion Training Institute', CONTENT_LEFT, FOOTER_Y, { height: 14 });
  doc.text(`Page ${pageNum} of ${totalPages}`, CONTENT_RIGHT - 60, FOOTER_Y, {
    width: 60,
    align: 'right',
    height: 14,
  });
  doc.fillColor(COLOR_BLACK);
}

function drawWatermark(
  doc: PDFKit.PDFDocument,
  logoPath: string
): void {
  try {
    doc.save();
    doc.opacity(WATERMARK_OPACITY);
    const x = (PAGE_WIDTH - WATERMARK_WIDTH) / 2;
    const y = (PAGE_HEIGHT - WATERMARK_WIDTH) / 2;
    doc.image(logoPath, x, y, { width: WATERMARK_WIDTH });
  } catch {
    // Logo missing or image failed: ignore
  } finally {
    doc.restore();
  }
}
