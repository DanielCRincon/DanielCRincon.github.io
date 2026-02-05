/**
 * PDF Generator - Using html2pdf.js for reliable PDF download
 * Handles language detection and proper file download
 */

// Wait for i18n to be available before initializing
function initPDFDownloader() {
    const downloadBtn = document.getElementById('download-cv');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', generatePDF);
    }
}

// Initialize when DOM is ready and i18n is available
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Wait a bit for i18n to initialize
        setTimeout(initPDFDownloader, 500);
    });
} else {
    // DOM already loaded
    setTimeout(initPDFDownloader, 500);
}

function generatePDF() {
    try {
        // Get current language
        const lang = window.i18n?.getCurrentLang() || 'es';
        const isSpanish = lang === 'es';

        // Check if html2pdf is available
        if (typeof html2pdf === 'undefined') {
            alert(isSpanish ? 'Error: Librería de PDF no cargada' : 'Error: PDF library not loaded');
            return;
        }

        // Create CV content based on language
        const cvContent = createCVContent(isSpanish);

        // Configure html2pdf options
        const options = {
            margin: 10,
            filename: isSpanish ? 'CV_Daniel_Cabrera.pdf' : 'CV_Daniel_Cabrera_EN.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' },
            pagebreak: { mode: ['css', 'legacy'] }
        };

        // Create temporary div with CV content
        const element = document.createElement('div');
        element.innerHTML = cvContent;
        element.style.display = 'none';
        document.body.appendChild(element);

        // Generate and download PDF
        html2pdf()
            .set(options)
            .from(element)
            .save()
            .then(() => {
                // Clean up
                document.body.removeChild(element);
            })
            .catch((error) => {
                console.error('Error generating PDF:', error);
                alert(isSpanish ? 'Error al generar el PDF' : 'Error generating PDF');
                document.body.removeChild(element);
            });

    } catch (error) {
        console.error('Unexpected error in generatePDF:', error);
        const isSpanish = window.i18n?.getCurrentLang() === 'es';
        alert(isSpanish ? 'Error inesperado al generar el PDF' : 'Unexpected error generating PDF');
    }
}

function createCVContent(isSpanish) {
    return `
        <div style="font-family: Arial, sans-serif; font-size: 11px; line-height: 1.4; color: #333; max-width: 800px;">
            <h1 style="font-size: 24px; color: #0A192F; text-align: center; margin-bottom: 5px;">DANIEL CABRERA RINCON</h1>
            <div style="text-align: center; color: #333; margin-bottom: 8px; font-size: 13px; font-weight: 500;">SAP ABAP Consultant | Full Stack Developer</div>
            <div style="text-align: center; font-size: 10px; color: #555; margin-bottom: 15px; line-height: 1.6;">
                <strong>Email:</strong> danielcabrerarincon@gmail.com | <strong>${isSpanish ? 'Tel' : 'Phone'}:</strong> +57 322 253 9049<br>
                <strong>LinkedIn:</strong> linkedin.com/in/daniel-cabrera-ia | <strong>GitHub:</strong> github.com/DanielCRincon<br>
                <strong>${isSpanish ? 'Ubicación' : 'Location'}:</strong> Bogota, Colombia
            </div>

            <div style="margin-bottom: 12px;">
                <h2 style="font-size: 13px; color: #0A192F; border-bottom: 2px solid #0A192F; padding-bottom: 3px; margin: 15px 0 10px 0; text-transform: uppercase;">${isSpanish ? 'PERFIL PROFESIONAL' : 'PROFESSIONAL PROFILE'}</h2>
                <p style="font-size: 11px;">${isSpanish
                    ? 'Ingeniero de Software e Industrial con +13 años de experiencia en SAP ABAP (FI, SD, MM, HR). Especializado en integraciones complejas, BAPIs y personalizaciones del estándar. Desarrollador Full Stack con Go, PostgreSQL y Docker. Fundador de Colombia-IA, iniciativa open-source para democratizar la inteligencia artificial.'
                    : 'Software and Industrial Engineer with +13 years of experience in SAP ABAP (FI, SD, MM, HR). Specialized in complex integrations, BAPIs and standard customizations. Full Stack Developer with Go, PostgreSQL and Docker. Founder of Colombia-IA, open-source initiative to democratize AI.'
                }</p>
            </div>

            <div style="display: flex; gap: 15px;">
                <div style="flex: 1;">
                    <div style="margin-bottom: 12px;">
                        <h2 style="font-size: 13px; color: #0A192F; border-bottom: 2px solid #0A192F; padding-bottom: 3px; margin: 15px 0 10px 0; text-transform: uppercase;">${isSpanish ? 'EXPERIENCIA LABORAL' : 'WORK EXPERIENCE'}</h2>
                        
                        <div style="margin-bottom: 10px;">
                            <div style="display: flex; justify-content: space-between;">
                                <span style="font-weight: bold; font-size: 11px;">Full Stack Developer - EdgeLabsDev</span>
                                <span style="color: #0A192F; font-size: 10px;">${isSpanish ? 'Ene 2025 - Presente' : 'Jan 2025 - Present'}</span>
                            </div>
                            <div style="color: #666; font-style: italic; font-size: 10px; margin: 2px 0 5px 0;'>Remoto</div>
                            <ul style="padding-left: 18px; font-size: 10px; margin: 0;">
                                <li style="margin-bottom: 2px;">${isSpanish ? 'Desarrollo de interfaces frontend con backend en Go vía API REST' : 'Frontend development with Go backend via REST API'}</li>
                                <li>${isSpanish ? 'Implementación de seguridad JWT y despliegue con Docker' : 'JWT security implementation and Docker deployment'}</li>
                            </ul>
                        </div>

                        <div style="margin-bottom: 10px;">
                            <div style="display: flex; justify-content: space-between;">
                                <span style="font-weight: bold; font-size: 11px;">SAP ABAP Developer - Star Net Consulting</span>
                                <span style="color: #0A192F; font-size: 10px;">${isSpanish ? 'Nov 2024 - Presente' : 'Nov 2024 - Present'}</span>
                            </div>
                            <div style="color: #666; font-style: italic; font-size: 10px; margin: 2px 0 5px 0;'>Remoto</div>
                            <ul style="padding-left: 18px; font-size: 10px; margin: 0;">
                                <li style="margin-bottom: 2px;">${isSpanish ? 'Desarrollo de reportes ALV y servicios OData en SAP Gateway' : 'ALV reports and OData services development in SAP Gateway'}</li>
                                <li>${isSpanish ? 'Integración con BAPIs y optimización de código legado' : 'BAPIs integration and legacy code optimization'}</li>
                            </ul>
                        </div>

                        <div style="margin-bottom: 10px;">
                            <div style="display: flex; justify-content: space-between;">
                                <span style="font-weight: bold; font-size: 11px;">ABAP HR-FI Developer - SMX Services</span>
                                <span style="color: #0A192F; font-size: 10px;">${isSpanish ? 'Dic 2024 - Presente' : 'Dec 2024 - Present'}</span>
                            </div>
                            <div style="color: #666; font-style: italic; font-size: 10px; margin: 2px 0 5px 0;'>Remoto</div>
                            <ul style="padding-left: 18px; font-size: 10px; margin: 0;">
                                <li style="margin-bottom: 2px;">${isSpanish ? 'Desarrollo SAP HR con SmartForms, HRFORM e infotipos' : 'SAP HR development with SmartForms, HRFORM and infotypes'}</li>
                                <li>${isSpanish ? 'Integración SAP PI para comunicación entre sistemas' : 'SAP PI integration for inter-system communication'}</li>
                            </ul>
                        </div>

                        <div style="margin-bottom: 10px;">
                            <div style="display: flex; justify-content: space-between;">
                                <span style="font-weight: bold; font-size: 11px;">${isSpanish ? 'Líder de Aplicaciones - Lab. La Sante' : 'Applications Leader - Lab. La Sante'}</span>
                                <span style="color: #0A192F; font-size: 10px;">${isSpanish ? 'Nov 2023 - Nov 2024' : 'Nov 2023 - Nov 2024'}</span>
                            </div>
                            <div style="color: #666; font-style: italic; font-size: 10px; margin: 2px 0 5px 0;'>Bogota, Colombia</div>
                            <ul style="padding-left: 18px; font-size: 10px; margin: 0;">
                                <li>${isSpanish ? 'Desarrollo ABAP en módulos SD y FI, migración a SAP HANA' : 'ABAP development in SD and FI modules, SAP HANA migration'}</li>
                            </ul>
                        </div>

                        <div style="margin-bottom: 10px;">
                            <div style="display: flex; justify-content: space-between;">
                                <span style="font-weight: bold; font-size: 11px;">ABAP Developer - HR Solutions</span>
                                <span style="color: #0A192F; font-size: 10px;">${isSpanish ? 'Jun - Nov 2023' : 'Jun - Nov 2023'}</span>
                            </div>
                            <div style="color: #666; font-style: italic; font-size: 10px; margin: 2px 0 5px 0;'>Remoto</div>
                            <ul style="padding-left: 18px; font-size: 10px; margin: 0;">
                                <li>${isSpanish ? 'Desarrollo SAP HR/HCM, integración con SuccessFactors' : 'SAP HR/HCM development, SuccessFactors integration'}</li>
                            </ul>
                        </div>

                        <div style="margin-bottom: 10px;">
                            <div style="display: flex; justify-content: space-between;">
                                <span style="font-weight: bold; font-size: 11px;">${isSpanish ? 'Coordinador / Dev ABAP' : 'Coordinator / ABAP Dev'}</span>
                                <span style="color: #0A192F; font-size: 10px;">2017 - 2023</span>
                            </div>
                            <div style="color: #666; font-style: italic; font-size: 10px; margin: 2px 0 5px 0;'>Nortesantandereana de Gas - Bogota</div>
                            <ul style="padding-left: 18px; font-size: 10px; margin: 0;">
                                <li>${isSpanish ? 'Desarrollo ABAP y gestión de proyectos Scrum' : 'ABAP development and Scrum project management'}</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div style="flex: 0 0 40%; background: #f5f5f5; padding: 12px;">
                    <div style="margin-bottom: 12px;">
                        <h2 style="font-size: 13px; color: #0A192F; border-bottom: 2px solid #0A192F; padding-bottom: 3px; margin: 15px 0 10px 0; text-transform: uppercase;">${isSpanish ? 'EDUCACIÓN' : 'EDUCATION'}</h2>
                        <div style="font-size: 10px; margin-bottom: 3px;"><strong>${isSpanish ? 'Ing. de Software' : 'Software Engineer'}</strong><br>Politécnico GranColombiano (2022)</div>
                        <div style="font-size: 10px;"><strong>${isSpanish ? 'Ing. Industrial' : 'Industrial Engineer'}</strong><br>Escuela Colombiana de Ingeniería (2006)</div>
                    </div>

                    <div style="margin-bottom: 12px;">
                        <h2 style="font-size: 13px; color: #0A192F; border-bottom: 2px solid #0A192F; padding-bottom: 3px; margin: 15px 0 10px 0; text-transform: uppercase;">${isSpanish ? 'HABILIDADES' : 'SKILLS'}</h2>
                        <div style="margin-bottom: 8px;">
                            <div style="font-weight: bold; font-size: 10px; color: #0A192F;">SAP & ABAP</div>
                            <div style="font-size: 9px; color: #555;">FI, SD, MM, HR, PM, BAPIs, Enhancements, SmartForms, ALV, OData, SAP PI</div>
                        </div>
                        <div style="margin-bottom: 8px;">
                            <div style="font-weight: bold; font-size: 10px; color: #0A192F;">Full Stack</div>
                            <div style="font-size: 9px; color: #555;">Go, JavaScript, Python, REST APIs, JWT, HTML/CSS</div>
                        </div>
                        <div>
                            <div style="font-weight: bold; font-size: 10px; color: #0A192F;">DevOps</div>
                            <div style="font-size: 9px; color: #555;">Docker, Git, PostgreSQL, SAP HANA, Linux</div>
                        </div>
                    </div>

                    <div style="margin-bottom: 12px;">
                        <h2 style="font-size: 13px; color: #0A192F; border-bottom: 2px solid #0A192F; padding-bottom: 3px; margin: 15px 0 10px 0; text-transform: uppercase;">${isSpanish ? 'CERTIFICACIONES' : 'CERTIFICATIONS'}</h2>
                        <div style="font-size: 10px; margin-bottom: 3px;">Scrum Master (SMPC) - CertiProf</div>
                        <div style="font-size: 10px; margin-bottom: 3px;">Product Owner (SPOPC) - CertiProf</div>
                        <div style="font-size: 10px; margin-bottom: 3px;">Agile Coach (ACPC) - CertiProf</div>
                        <div style="font-size: 10px; margin-bottom: 3px;">IBM Machine Learning</div>
                        <div style="font-size: 10px;">SAP UI5 - Logali Group</div>
                    </div>

                    <div style="margin-bottom: 12px;">
                        <h2 style="font-size: 13px; color: #0A192F; border-bottom: 2px solid #0A192F; padding-bottom: 3px; margin: 15px 0 10px 0; text-transform: uppercase;">${isSpanish ? 'IDIOMAS' : 'LANGUAGES'}</h2>
                        <div style="font-size: 10px; margin-bottom: 3px;"><strong>${isSpanish ? 'Español' : 'Spanish'}:</strong> ${isSpanish ? 'Nativo' : 'Native'}</div>
                        <div style="font-size: 10px;"><strong>${isSpanish ? 'Inglés' : 'English'}:</strong> ${isSpanish ? 'Intermedio-Alto' : 'Upper-Intermediate'}</div>
                    </div>

                    <div>
                        <h2 style="font-size: 13px; color: #0A192F; border-bottom: 2px solid #0A192F; padding-bottom: 3px; margin: 15px 0 10px 0; text-transform: uppercase;">${isSpanish ? 'PROYECTOS' : 'PROJECTS'}</h2>
                        <div style="font-size: 10px; margin-bottom: 3px;"><strong>Colombia-IA</strong> - colombia-ia.github.io</div>
                        <div style="font-size: 10px;"><strong>Edge Labs Dev</strong> - edgelabsdev.com</div>
                    </div>
                </div>
            </div>

            <div style="text-align: center; margin-top: 15px; font-size: 9px; color: #999; border-top: 1px solid #ddd; padding-top: 10px;">
                ${isSpanish ? 'Referencias disponibles a solicitud' : 'References available upon request'} | danielcrincon.github.io
            </div>
        </div>
    `;
}