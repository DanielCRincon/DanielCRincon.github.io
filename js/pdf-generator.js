/**
 * PDF Generator
 * Creates a professional/traditional CV in PDF format
 */

document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn = document.getElementById('download-cv');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', generatePDF);
    }
});

async function generatePDF() {
    const btn = document.getElementById('download-cv');
    const originalText = btn.innerHTML;

    // Show loading state
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generando...';
    btn.disabled = true;

    try {
        // Load translations directly to avoid timing issues
        const response = await fetch('data/content.json');
        const allTranslations = await response.json();

        const lang = window.i18n?.getCurrentLang() || 'es';
        const translations = allTranslations[lang];

        if (!translations) {
            throw new Error('Could not load translations');
        }

        // Create PDF content
        const pdfContent = createPDFContent(translations, lang);

        // Create temporary container
        const container = document.createElement('div');
        container.id = 'pdf-container';
        container.innerHTML = pdfContent;
        container.style.position = 'absolute';
        container.style.left = '-9999px';
        container.style.top = '0';
        container.style.width = '210mm'; // A4 width
        container.style.background = 'white';
        document.body.appendChild(container);

        // Small delay to ensure DOM is rendered
        await new Promise(resolve => setTimeout(resolve, 100));

        // PDF options
        const opt = {
            margin: [5, 5, 5, 5],
            filename: `CV_Daniel_Cabrera_Rincon_${lang.toUpperCase()}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 2,
                useCORS: true,
                letterRendering: true,
                logging: false
            },
            jsPDF: {
                unit: 'mm',
                format: 'a4',
                orientation: 'portrait'
            },
            pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
        };

        // Generate PDF
        await html2pdf().set(opt).from(container).save();

        // Cleanup
        document.body.removeChild(container);

    } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Error generating PDF. Please try again.');
    } finally {
        // Restore button
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
}

function createPDFContent(translations, lang) {
    const isSpanish = lang === 'es';
    const jobs = translations?.experience?.jobs || [];

    // Generate experience HTML
    const experienceHTML = jobs.slice(0, 7).map(job => `
        <div style="margin-bottom: 10px; page-break-inside: avoid;">
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="font-size: 11px; color: #0A192F; font-weight: bold;">${job.title}</td>
                    <td style="font-size: 10px; color: #0A192F; text-align: right; font-weight: 500;">${job.date}</td>
                </tr>
            </table>
            <div style="font-size: 10px; color: #666; font-style: italic; margin: 2px 0 5px 0;">
                ${job.company} | ${job.location}
            </div>
            <ul style="font-size: 9px; color: #444; margin: 0; padding-left: 15px; line-height: 1.4;">
                ${job.description.slice(0, 2).map(desc => `<li style="margin-bottom: 2px;">${desc}</li>`).join('')}
            </ul>
        </div>
    `).join('');

    return `
        <div style="font-family: Arial, Helvetica, sans-serif; color: #333; padding: 15px; background: white; width: 100%; box-sizing: border-box;">
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 15px; border-bottom: 3px solid #0A192F; padding-bottom: 15px;">
                <h1 style="font-size: 24px; color: #0A192F; margin: 0 0 5px 0; text-transform: uppercase; letter-spacing: 2px;">
                    DANIEL CABRERA RINCON
                </h1>
                <p style="font-size: 13px; color: #0A192F; margin: 0 0 10px 0; font-weight: 600;">
                    SAP ABAP Consultant | Full Stack Developer
                </p>
                <div style="font-size: 10px; color: #666;">
                    danielcabrerarincon@gmail.com | +57 322 253 9049 | linkedin.com/in/daniel-cabrera-ia | github.com/DanielCRincon
                </div>
                <div style="font-size: 10px; color: #666; margin-top: 3px;">
                    Bogota, Colombia
                </div>
            </div>

            <!-- Main Content Table -->
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <!-- Left Column -->
                    <td style="width: 65%; vertical-align: top; padding-right: 15px;">

                        <!-- Profile -->
                        <div style="margin-bottom: 12px;">
                            <h2 style="font-size: 12px; color: #0A192F; border-bottom: 2px solid #0A192F; padding-bottom: 3px; margin: 0 0 8px 0; text-transform: uppercase;">
                                ${isSpanish ? 'PERFIL PROFESIONAL' : 'PROFESSIONAL PROFILE'}
                            </h2>
                            <p style="font-size: 10px; line-height: 1.5; color: #444; margin: 0; text-align: justify;">
                                ${isSpanish
                                    ? 'Ingeniero de Software e Industrial con +13 anos de experiencia en SAP ABAP (FI, SD, MM, HR). Especializado en integraciones complejas, BAPIs y personalizaciones. Desarrollador Full Stack con Go, PostgreSQL y Docker. Fundador de Colombia-IA, iniciativa open-source para democratizar la IA.'
                                    : 'Software and Industrial Engineer with +13 years of experience in SAP ABAP (FI, SD, MM, HR). Specialized in complex integrations, BAPIs and customizations. Full Stack Developer with Go, PostgreSQL and Docker. Founder of Colombia-IA, open-source initiative to democratize AI.'
                                }
                            </p>
                        </div>

                        <!-- Experience -->
                        <div>
                            <h2 style="font-size: 12px; color: #0A192F; border-bottom: 2px solid #0A192F; padding-bottom: 3px; margin: 0 0 8px 0; text-transform: uppercase;">
                                ${isSpanish ? 'EXPERIENCIA LABORAL' : 'WORK EXPERIENCE'}
                            </h2>
                            ${experienceHTML}
                        </div>
                    </td>

                    <!-- Right Column -->
                    <td style="width: 35%; vertical-align: top; background: #f5f5f5; padding: 10px;">

                        <!-- Education -->
                        <div style="margin-bottom: 12px;">
                            <h2 style="font-size: 11px; color: #0A192F; border-bottom: 2px solid #0A192F; padding-bottom: 3px; margin: 0 0 8px 0; text-transform: uppercase;">
                                ${isSpanish ? 'EDUCACION' : 'EDUCATION'}
                            </h2>
                            <div style="margin-bottom: 8px;">
                                <div style="font-size: 10px; color: #0A192F; font-weight: bold;">
                                    ${isSpanish ? 'Ingeniero de Software' : 'Software Engineer'}
                                </div>
                                <div style="font-size: 9px; color: #666;">Politecnico GranColombiano</div>
                                <div style="font-size: 9px; color: #0A192F;">2022</div>
                            </div>
                            <div>
                                <div style="font-size: 10px; color: #0A192F; font-weight: bold;">
                                    ${isSpanish ? 'Ingeniero Industrial' : 'Industrial Engineer'}
                                </div>
                                <div style="font-size: 9px; color: #666;">Escuela Colombiana de Ingenieria</div>
                                <div style="font-size: 9px; color: #0A192F;">2006</div>
                            </div>
                        </div>

                        <!-- Skills -->
                        <div style="margin-bottom: 12px;">
                            <h2 style="font-size: 11px; color: #0A192F; border-bottom: 2px solid #0A192F; padding-bottom: 3px; margin: 0 0 8px 0; text-transform: uppercase;">
                                ${isSpanish ? 'HABILIDADES' : 'SKILLS'}
                            </h2>
                            <div style="margin-bottom: 6px;">
                                <div style="font-size: 9px; color: #0A192F; font-weight: bold;">SAP & ABAP</div>
                                <div style="font-size: 8px; color: #666; line-height: 1.3;">
                                    FI, SD, MM, HR, PM, BAPIs, Enhancements, SmartForms, ALV, RFC, OData, SAP PI
                                </div>
                            </div>
                            <div style="margin-bottom: 6px;">
                                <div style="font-size: 9px; color: #0A192F; font-weight: bold;">Full Stack</div>
                                <div style="font-size: 8px; color: #666; line-height: 1.3;">
                                    Go, JavaScript, Python, HTML/CSS, Node.js, SAPUI5, REST APIs, JWT
                                </div>
                            </div>
                            <div style="margin-bottom: 6px;">
                                <div style="font-size: 9px; color: #0A192F; font-weight: bold;">DevOps</div>
                                <div style="font-size: 8px; color: #666; line-height: 1.3;">
                                    Docker, Git, PostgreSQL, SAP HANA, Linux
                                </div>
                            </div>
                            <div>
                                <div style="font-size: 9px; color: #0A192F; font-weight: bold;">${isSpanish ? 'Metodologias' : 'Methodologies'}</div>
                                <div style="font-size: 8px; color: #666; line-height: 1.3;">
                                    Scrum, Agile, PMI, JIRA
                                </div>
                            </div>
                        </div>

                        <!-- Certifications -->
                        <div style="margin-bottom: 12px;">
                            <h2 style="font-size: 11px; color: #0A192F; border-bottom: 2px solid #0A192F; padding-bottom: 3px; margin: 0 0 8px 0; text-transform: uppercase;">
                                ${isSpanish ? 'CERTIFICACIONES' : 'CERTIFICATIONS'}
                            </h2>
                            <ul style="font-size: 8px; color: #444; margin: 0; padding-left: 12px; line-height: 1.5;">
                                <li>Scrum Master (SMPC) - CertiProf</li>
                                <li>Product Owner (SPOPC) - CertiProf</li>
                                <li>Agile Coach (ACPC) - CertiProf</li>
                                <li>IBM Machine Learning</li>
                                <li>SAP UI5 - Logali Group</li>
                                <li>ABAP in the Cloud - SAP</li>
                            </ul>
                        </div>

                        <!-- Languages -->
                        <div style="margin-bottom: 12px;">
                            <h2 style="font-size: 11px; color: #0A192F; border-bottom: 2px solid #0A192F; padding-bottom: 3px; margin: 0 0 8px 0; text-transform: uppercase;">
                                ${isSpanish ? 'IDIOMAS' : 'LANGUAGES'}
                            </h2>
                            <div style="font-size: 9px; color: #444;">
                                <strong>${isSpanish ? 'Espanol' : 'Spanish'}:</strong> ${isSpanish ? 'Nativo' : 'Native'}
                            </div>
                            <div style="font-size: 9px; color: #444;">
                                <strong>${isSpanish ? 'Ingles' : 'English'}:</strong> ${isSpanish ? 'Intermedio-Alto' : 'Upper-Intermediate'}
                            </div>
                        </div>

                        <!-- Projects -->
                        <div>
                            <h2 style="font-size: 11px; color: #0A192F; border-bottom: 2px solid #0A192F; padding-bottom: 3px; margin: 0 0 8px 0; text-transform: uppercase;">
                                ${isSpanish ? 'PROYECTOS' : 'PROJECTS'}
                            </h2>
                            <div style="margin-bottom: 5px;">
                                <div style="font-size: 9px; color: #0A192F; font-weight: bold;">Colombia-IA</div>
                                <div style="font-size: 8px; color: #666;">colombia-ia.github.io</div>
                            </div>
                            <div>
                                <div style="font-size: 9px; color: #0A192F; font-weight: bold;">Edge Labs Dev</div>
                                <div style="font-size: 8px; color: #666;">edgelabsdev.com</div>
                            </div>
                        </div>
                    </td>
                </tr>
            </table>

            <!-- Footer -->
            <div style="margin-top: 10px; padding-top: 8px; border-top: 1px solid #ddd; text-align: center;">
                <p style="font-size: 8px; color: #999; margin: 0;">
                    ${isSpanish ? 'Referencias disponibles a solicitud' : 'References available upon request'} | danielcrincon.github.io
                </p>
            </div>
        </div>
    `;
}
