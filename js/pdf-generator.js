// Import the necessary libraries
import { html2pdf } from 'html2pdf.js';

// Fetch job descriptions from content.json
fetch('data/content.json')
    .then(response => response.json())
    .then(data => {
        const jobDescriptions = data.jobDescriptions; // Assuming jobDescriptions is an array

        // Create a container for PDF content
        const contentDiv = document.createElement('div');

        jobDescriptions.forEach(job => {
            const jobElement = document.createElement('div');
            jobElement.innerHTML = `<h2>${job.title}</h2><p>${job.description}</p>`;
            contentDiv.appendChild(jobElement);
        });

        // Generate PDF
        const options = {
            margin: 1,
            filename: 'job_descriptions.pdf',
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        html2pdf().from(contentDiv).set(options).save();
    })
    .catch(error => console.error('Error fetching job descriptions:', error));
