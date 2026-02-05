const fs = require('fs');
const pdf = require('pdfkit');
const contents = JSON.parse(fs.readFileSync('data/content.json', 'utf8'));

function generatePDF() {
    const doc = new pdf();
    doc.pipe(fs.createWriteStream('output/comprehensive_jobs.pdf'));
    
    contents.jobs.forEach(job => {
        doc.text(`Position: ${job.position}`);
        doc.text(`Description: ${job.description}`);
        doc.text(`Responsibilities: ${job.responsibilities.join(', ')}`);
        doc.text(`Skills: ${job.skills.join(', ')}`);
        doc.addPage();
    });
    
    doc.end();
}

generatePDF();
