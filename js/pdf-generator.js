const fs = require('fs');
const PDFDocument = require('pdfkit');
const data = require('./data/content.json');

function generatePDF() {
  const doc = new PDFDocument();
  const filePath = `output/experience.pdf`;

  doc.pipe(fs.createWriteStream(filePath));

  // Add a title
  doc.fontSize(25).text('Experience', { underline: true });
  doc.moveDown();

  data.jobs.forEach(job => {
      doc.fontSize(18).text(job.title);
      doc.fontSize(12).text(`Company: ${job.company}`);
      doc.fontSize(12).text(`Location: ${job.location}`);
      doc.fontSize(12).text(`Duration: ${job.duration}`);
      doc.fontSize(12).text(`Description: ${job.description}`);
      doc.moveDown();
  });

  doc.end();
  console.log(`PDF generated at: ${filePath}`);
}

generatePDF();