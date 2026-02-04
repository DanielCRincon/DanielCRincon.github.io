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
        const translations = window.i18n?.getCurrentTranslations();
        const lang = window.i18n?.getCurrentLang() || 'es';

        // Create PDF content
        const pdfContent = createPDFContent(translations, lang);

        // Create temporary container
        const container = document.createElement('div');
        container.innerHTML = pdfContent;
        container.style.position = 'absolute';
        container.style.left = '-9999px';
        container.style.top = '0';
        document.body.appendChild(container);

        // PDF options
        const opt = {
            margin: [10, 10, 10, 10],
            filename: `CV_Daniel_Cabrera_Rincon_${lang.toUpperCase()}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 2,
                useCORS: true,
                letterRendering: true
            },
            jsPDF: {
                unit: 'mm',
                format: 'a4',
                orientation: 'portrait'
            },
            pagebreak: { mode: 'avoid-all', before: '.page-break' }
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
    const projects = translations?.projects?.items || [];

    return `
        <div style="font-family: Arial, Helvetica, sans-serif; color: #333; padding: 20px; max-width: 800px; margin: 0 auto; background: white;">
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 25px; border-bottom: 3px solid #0A192F; padding-bottom: 20px;">
                <h1 style="font-size: 28px; color: #0A192F; margin: 0 0 5px 0; text-transform: uppercase; letter-spacing: 2px;">
                    DANIEL CABRERA RINCON
                </h1>
                <p style="font-size: 14px; color: #64FFDA; margin: 0 0 15px 0; font-weight: 600;">
                    SAP ABAP Consultant | Full Stack Developer
                </p>
                <div style="font-size: 11px; color: #666;">
                    <span style="margin-right: 15px;">
                        <strong>Email:</strong> danielcabrerarincon@gmail.com
                    </span>
                    <span style="margin-right: 15px;">
                        <strong>${isSpanish ? 'Tel' : 'Phone'}:</strong> +57 322 253 9049
                    </span>
                    <span style="margin-right: 15px;">
                        <strong>LinkedIn:</strong> linkedin.com/in/daniel-cabrera-ia
                    </span>
                    <span>
                        <strong>GitHub:</strong> github.com/DanielCRincon
                    </span>
                </div>
                <div style="font-size: 11px; color: #666; margin-top: 5px;">
                    <span><strong>${isSpanish ? 'Ubicacion' : 'Location'}:</strong> Bogota, Colombia</span>
                </div>
            </div>

            <!-- Two Column Layout -->
            <div style="display: flex; gap: 25px;">
                <!-- Left Column (Main Content) -->
                <div style="flex: 2;">
                    <!-- Professional Profile -->
                    <div style="margin-bottom: 20px;">
                        <h2 style="font-size: 14px; color: #0A192F; border-bottom: 2px solid #64FFDA; padding-bottom: 5px; margin-bottom: 10px; text-transform: uppercase;">
                            ${isSpanish ? 'Perfil Profesional' : 'Professional Profile'}
                        </h2>
                        <p style="font-size: 11px; line-height: 1.6; color: #444; text-align: justify;">
                            ${isSpanish
                                ? 'Ingeniero de Software e Industrial con un perfil tecnico hibrido. Cuento con una solida trayectoria de +13 anos en SAP ABAP (FI, SD, MM, HR), especializandome en integraciones complejas, BAPIs y personalizaciones del estandar. Actualmente, expando el ecosistema corporativo como Desarrollador Full Stack, construyendo soluciones modernas con Go (Golang), PostgreSQL y Docker. Fundador de Colombia-IA, iniciativa open-source para democratizar la inteligencia artificial.'
                                : 'Software and Industrial Engineer with a hybrid technical profile. I have a solid track record of +13 years in SAP ABAP (FI, SD, MM, HR), specializing in complex integrations, BAPIs, and standard customizations. Currently, I expand the corporate ecosystem as a Full Stack Developer, building modern solutions with Go (Golang), PostgreSQL, and Docker. Founder of Colombia-IA, an open-source initiative to democratize artificial intelligence.'
                            }
                        </p>
                    </div>

                    <!-- Experience -->
                    <div style="margin-bottom: 20px;">
                        <h2 style="font-size: 14px; color: #0A192F; border-bottom: 2px solid #64FFDA; padding-bottom: 5px; margin-bottom: 10px; text-transform: uppercase;">
                            ${isSpanish ? 'Experiencia Laboral' : 'Work Experience'}
                        </h2>
                        ${jobs.slice(0, 8).map(job => `
                            <div style="margin-bottom: 12px;">
                                <div style="display: flex; justify-content: space-between; align-items: baseline;">
                                    <h3 style="font-size: 12px; color: #0A192F; margin: 0; font-weight: 600;">
                                        ${job.title}
                                    </h3>
                                    <span style="font-size: 10px; color: #64FFDA; font-weight: 500;">
                                        ${job.date}
                                    </span>
                                </div>
                                <p style="font-size: 11px; color: #666; margin: 2px 0 5px 0; font-style: italic;">
                                    ${job.company} | ${job.location}
                                </p>
                                <ul style="font-size: 10px; color: #444; margin: 0; padding-left: 15px; line-height: 1.5;">
                                    ${job.description.slice(0, 3).map(desc => `
                                        <li style="margin-bottom: 2px;">${desc}</li>
                                    `).join('')}
                                </ul>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Right Column (Sidebar) -->
                <div style="flex: 1; background: #f8f9fa; padding: 15px; border-radius: 5px;">
                    <!-- Education -->
                    <div style="margin-bottom: 20px;">
                        <h2 style="font-size: 12px; color: #0A192F; border-bottom: 2px solid #64FFDA; padding-bottom: 5px; margin-bottom: 10px; text-transform: uppercase;">
                            ${isSpanish ? 'Educacion' : 'Education'}
                        </h2>
                        <div style="margin-bottom: 10px;">
                            <h3 style="font-size: 11px; color: #0A192F; margin: 0;">
                                ${isSpanish ? 'Ingeniero de Software' : 'Software Engineer'}
                            </h3>
                            <p style="font-size: 10px; color: #666; margin: 2px 0;">
                                Politecnico GranColombiano
                            </p>
                            <p style="font-size: 10px; color: #64FFDA; margin: 0;">2022</p>
                        </div>
                        <div style="margin-bottom: 10px;">
                            <h3 style="font-size: 11px; color: #0A192F; margin: 0;">
                                ${isSpanish ? 'Ingeniero Industrial' : 'Industrial Engineer'}
                            </h3>
                            <p style="font-size: 10px; color: #666; margin: 2px 0;">
                                Escuela Colombiana de Ingenieria
                            </p>
                            <p style="font-size: 10px; color: #64FFDA; margin: 0;">2006</p>
                        </div>
                    </div>

                    <!-- Skills -->
                    <div style="margin-bottom: 20px;">
                        <h2 style="font-size: 12px; color: #0A192F; border-bottom: 2px solid #64FFDA; padding-bottom: 5px; margin-bottom: 10px; text-transform: uppercase;">
                            ${isSpanish ? 'Habilidades' : 'Skills'}
                        </h2>
                        <div style="margin-bottom: 10px;">
                            <h4 style="font-size: 10px; color: #0A192F; margin: 0 0 5px 0;">SAP & ABAP</h4>
                            <p style="font-size: 9px; color: #666; margin: 0; line-height: 1.4;">
                                FI, SD, MM, HR, PM, BAPIs, User Exits, Enhancements, SmartForms, ALV, RFC, Web Services, SAP PI, OData
                            </p>
                        </div>
                        <div style="margin-bottom: 10px;">
                            <h4 style="font-size: 10px; color: #0A192F; margin: 0 0 5px 0;">Full Stack</h4>
                            <p style="font-size: 9px; color: #666; margin: 0; line-height: 1.4;">
                                Go, JavaScript, Python, C#, HTML5, CSS3, Node.js, SAPUI5, Web Dynpro, REST APIs, JWT
                            </p>
                        </div>
                        <div style="margin-bottom: 10px;">
                            <h4 style="font-size: 10px; color: #0A192F; margin: 0 0 5px 0;">DevOps & Tools</h4>
                            <p style="font-size: 9px; color: #666; margin: 0; line-height: 1.4;">
                                Docker, Git, PostgreSQL, SAP HANA, Linux, JIRA, Confluence
                            </p>
                        </div>
                        <div style="margin-bottom: 10px;">
                            <h4 style="font-size: 10px; color: #0A192F; margin: 0 0 5px 0;">${isSpanish ? 'Metodologias' : 'Methodologies'}</h4>
                            <p style="font-size: 9px; color: #666; margin: 0; line-height: 1.4;">
                                Scrum, Agile, PMI
                            </p>
                        </div>
                    </div>

                    <!-- Certifications -->
                    <div style="margin-bottom: 20px;">
                        <h2 style="font-size: 12px; color: #0A192F; border-bottom: 2px solid #64FFDA; padding-bottom: 5px; margin-bottom: 10px; text-transform: uppercase;">
                            ${isSpanish ? 'Certificaciones' : 'Certifications'}
                        </h2>
                        <ul style="font-size: 9px; color: #444; margin: 0; padding-left: 12px; line-height: 1.6;">
                            <li>Scrum Master Professional (SMPC) - CertiProf</li>
                            <li>Scrum Product Owner Professional (SPOPC) - CertiProf</li>
                            <li>Agile Coach Professional (ACPC) - CertiProf</li>
                            <li>IBM Machine Learning Foundations</li>
                            <li>SAP UI5 - Logali Group</li>
                            <li>ABAP in the Cloud - SAP</li>
                        </ul>
                    </div>

                    <!-- Languages -->
                    <div style="margin-bottom: 20px;">
                        <h2 style="font-size: 12px; color: #0A192F; border-bottom: 2px solid #64FFDA; padding-bottom: 5px; margin-bottom: 10px; text-transform: uppercase;">
                            ${isSpanish ? 'Idiomas' : 'Languages'}
                        </h2>
                        <p style="font-size: 10px; color: #444; margin: 0;">
                            <strong>${isSpanish ? 'Espanol' : 'Spanish'}:</strong> ${isSpanish ? 'Nativo' : 'Native'}
                        </p>
                        <p style="font-size: 10px; color: #444; margin: 3px 0 0 0;">
                            <strong>${isSpanish ? 'Ingles' : 'English'}:</strong> ${isSpanish ? 'Intermedio-Alto' : 'Upper-Intermediate'}
                        </p>
                    </div>

                    <!-- Projects -->
                    <div>
                        <h2 style="font-size: 12px; color: #0A192F; border-bottom: 2px solid #64FFDA; padding-bottom: 5px; margin-bottom: 10px; text-transform: uppercase;">
                            ${isSpanish ? 'Proyectos' : 'Projects'}
                        </h2>
                        <div style="margin-bottom: 8px;">
                            <h4 style="font-size: 10px; color: #0A192F; margin: 0;">Colombia-IA</h4>
                            <p style="font-size: 9px; color: #666; margin: 2px 0;">
                                colombia-ia.github.io
                            </p>
                        </div>
                        <div style="margin-bottom: 8px;">
                            <h4 style="font-size: 10px; color: #0A192F; margin: 0;">Edge Labs Dev</h4>
                            <p style="font-size: 9px; color: #666; margin: 2px 0;">
                                edgelabsdev.com
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div style="margin-top: 20px; padding-top: 10px; border-top: 1px solid #ddd; text-align: center;">
                <p style="font-size: 9px; color: #999; margin: 0;">
                    ${isSpanish ? 'Referencias disponibles a solicitud' : 'References available upon request'}
                </p>
            </div>
        </div>
    `;
}
