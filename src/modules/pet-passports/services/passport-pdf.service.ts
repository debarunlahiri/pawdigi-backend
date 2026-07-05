import { Injectable } from '@nestjs/common';
import PDFDocument from 'pdfkit';

@Injectable()
export class PassportPdfService {
  async renderBasicPassport(data: { passportNo: string; petName: string }) {
    const doc = new PDFDocument({ size: 'A4', margin: 48 });
    const chunks: Buffer[] = [];
    doc.on('data', (chunk) => chunks.push(chunk));
    doc.fontSize(20).text('PawDigi Pet Passport');
    doc.moveDown().fontSize(12).text(`Passport: ${data.passportNo}`);
    doc.text(`Pet: ${data.petName}`);
    doc.end();
    await new Promise((resolve) => doc.on('end', resolve));
    return Buffer.concat(chunks);
  }
}
