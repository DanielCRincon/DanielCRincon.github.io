/**
 * PDF Generator - Print-based approach
 * More reliable than html2pdf.js
 */

document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn = document.getElementById('download-cv');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', generatePDF);
    }
});

function generatePDF() {
    const lang = window.i18n?.getCurrentLang() || 'es';
    const isSpanish = lang === 'es';

    // Create print window
    const printWindow = window.open('', '_blank');

    if (!printWindow) {
        alert(isSpanish ? 'Por favor permite las ventanas emergentes para descargar el CV' : 'Please allow popups to download the CV');
        return;
    }

    const content = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>CV - Daniel Cabrera Rincon</title>
    <style>
        @media print {
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: Arial, sans-serif;
            font-size: 11px;
            line-height: 1.4;
            color: #333;
            padding: 20px;
            max-width: 800px;
            margin: 0 auto;
        }
        h1 { font-size: 24px; color: #0A192F; text-align: center; margin-bottom: 5px; }
        h2 { font-size: 13px; color: #0A192F; border-bottom: 2px solid #0A192F; padding-bottom: 3px; margin: 15px 0 10px 0; text-transform: uppercase; }
        .subtitle { text-align: center; color: #333; margin-bottom: 8px; font-size: 13px; font-weight: 500; }
        .contact { text-align: center; font-size: 10px; color: #555; margin-bottom: 15px; line-height: 1.6; }
        .section { margin-bottom: 12px; }
        .job { margin-bottom: 10px; page-break-inside: avoid; }
        .job-header { overflow: hidden; }
        .job-title { font-weight: bold; font-size: 11px; float: left; }
        .job-date { color: #0A192F; font-size: 10px; float: right; }
        .job-company { color: #666; font-style: italic; font-size: 10px; margin: 2px 0 5px 0; clear: both; }
        ul { padding-left: 18px; font-size: 10px; }
        li { margin-bottom: 2px; }
        .two-col { overflow: hidden; }
        .col-left { float: left; width: 58%; padding-right: 15px; }
        .col-right { float: right; width: 40%; background: #f5f5f5; padding: 12px; }
        .skill-group { margin-bottom: 8px; }
        .skill-title { font-weight: bold; font-size: 10px; color: #0A192F; }
        .skill-list { font-size: 9px; color: #555; }
        .cert-item { font-size: 10px; margin-bottom: 3px; }
        .footer { text-align: center; margin-top: 15px; font-size: 9px; color: #999; border-top: 1px solid #ddd; padding-top: 10px; clear: both; }
        .print-btn {
            display: block;
            margin: 20px auto;
            padding: 12px 30px;
            background: #0A192F;
            color: white;
            border: none;
            cursor: pointer;
            font-size: 14px;
            border-radius: 5px;
        }
        .print-btn:hover { background: #1a3a5c; }
        @media print { .print-btn { display: none; } }
    </style>
</head>
<body>
    <button class="print-btn" onclick="window.print()">${isSpanish ? 'Imprimir / Guardar como PDF' : 'Print / Save as PDF'}</button>

    <h1>DANIEL CABRERA RINCON</h1>
    <div class="subtitle">SAP ABAP Consultant | Full Stack Developer</div>
    <div class="contact">
        <strong>Email:</strong> danielcabrerarincon@gmail.com | <strong>${isSpanish ? 'Tel' : 'Phone'}:</strong> +57 322 253 9049<br>
        <strong>LinkedIn:</strong> linkedin.com/in/daniel-cabrera-ia | <strong>GitHub:</strong> github.com/DanielCRincon<br>
        <strong>${isSpanish ? 'Ubicacion' : 'Location'}:</strong> Bogota, Colombia
    </div>

    <div class="section">
        <h2>${isSpanish ? 'PERFIL PROFESIONAL' : 'PROFESSIONAL PROFILE'}</h2>
        <p>${isSpanish
            ? 'Ingeniero de Software e Industrial con +13 anos de experiencia en SAP ABAP (FI, SD, MM, HR). Especializado en integraciones complejas, BAPIs y personalizaciones del estandar. Desarrollador Full Stack con Go, PostgreSQL y Docker. Fundador de Colombia-IA, iniciativa open-source para democratizar la inteligencia artificial.'
            : 'Software and Industrial Engineer with +13 years of experience in SAP ABAP (FI, SD, MM, HR). Specialized in complex integrations, BAPIs and standard customizations. Full Stack Developer with Go, PostgreSQL and Docker. Founder of Colombia-IA, open-source initiative to democratize AI.'
        }</p>
    </div>

    <div class="two-col">
        <div class="col-left">
            <div class="section">
                <h2>${isSpanish ? 'EXPERIENCIA LABORAL' : 'WORK EXPERIENCE'}</h2>

                <div class="job">
                    <div class="job-header">
                        <span class="job-title">Full Stack Developer - EdgeLabsDev</span>
                        <span class="job-date">${isSpanish ? 'Ene 2025 - Presente' : 'Jan 2025 - Present'}</span>
                    </div>
                    <div class="job-company">Remoto</div>
                    <ul>
                        <li>${isSpanish ? 'Desarrollo de interfaces frontend con backend en Go via API REST' : 'Frontend development with Go backend via REST API'}</li>
                        <li>${isSpanish ? 'Implementacion de seguridad JWT y despliegue con Docker' : 'JWT security implementation and Docker deployment'}</li>
                    </ul>
                </div>

                <div class="job">
                    <div class="job-header">
                        <span class="job-title">SAP ABAP Developer - Star Net Consulting</span>
                        <span class="job-date">${isSpanish ? 'Nov 2024 - Presente' : 'Nov 2024 - Present'}</span>
                    </div>
                    <div class="job-company">Remoto</div>
                    <ul>
                        <li>${isSpanish ? 'Desarrollo de reportes ALV y servicios OData en SAP Gateway' : 'ALV reports and OData services development in SAP Gateway'}</li>
                        <li>${isSpanish ? 'Integracion con BAPIs y optimizacion de codigo legado' : 'BAPIs integration and legacy code optimization'}</li>
                    </ul>
                </div>

                <div class="job">
                    <div class="job-header">
                        <span class="job-title">ABAP HR-FI Developer - SMX Services</span>
                        <span class="job-date">${isSpanish ? 'Dic 2024 - Presente' : 'Dec 2024 - Present'}</span>
                    </div>
                    <div class="job-company">Remoto</div>
                    <ul>
                        <li>${isSpanish ? 'Desarrollo SAP HR con SmartForms, HRFORM e infotipos' : 'SAP HR development with SmartForms, HRFORM and infotypes'}</li>
                        <li>${isSpanish ? 'Integracion SAP PI para comunicacion entre sistemas' : 'SAP PI integration for inter-system communication'}</li>
                    </ul>
                </div>

                <div class="job">
                    <div class="job-header">
                        <span class="job-title">${isSpanish ? 'Lider de Aplicaciones - Lab. La Sante' : 'Applications Leader - Lab. La Sante'}</span>
                        <span class="job-date">${isSpanish ? 'Nov 2023 - Nov 2024' : 'Nov 2023 - Nov 2024'}</span>
                    </div>
                    <div class="job-company">Bogota, Colombia</div>
                    <ul>
                        <li>${isSpanish ? 'Desarrollo ABAP en modulos SD y FI, migracion a SAP HANA' : 'ABAP development in SD and FI modules, SAP HANA migration'}</li>
                    </ul>
                </div>

                <div class="job">
                    <div class="job-header">
                        <span class="job-title">ABAP Developer - HR Solutions</span>
                        <span class="job-date">${isSpanish ? 'Jun - Nov 2023' : 'Jun - Nov 2023'}</span>
                    </div>
                    <div class="job-company">Remoto</div>
                    <ul>
                        <li>${isSpanish ? 'Desarrollo SAP HR/HCM, integracion con SuccessFactors' : 'SAP HR/HCM development, SuccessFactors integration'}</li>
                    </ul>
                </div>

                <div class="job">
                    <div class="job-header">
                        <span class="job-title">${isSpanish ? 'Coordinador / Dev ABAP' : 'Coordinator / ABAP Dev'}</span>
                        <span class="job-date">2017 - 2023</span>
                    </div>
                    <div class="job-company">Nortesantandereana de Gas - Bogota</div>
                    <ul>
                        <li>${isSpanish ? 'Desarrollo ABAP y gestion de proyectos Scrum' : 'ABAP development and Scrum project management'}</li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="col-right">
            <div class="section">
                <h2>${isSpanish ? 'EDUCACION' : 'EDUCATION'}</h2>
                <div class="cert-item"><strong>${isSpanish ? 'Ing. de Software' : 'Software Engineer'}</strong><br>Politecnico GranColombiano (2022)</div>
                <div class="cert-item"><strong>${isSpanish ? 'Ing. Industrial' : 'Industrial Engineer'}</strong><br>Escuela Colombiana de Ingenieria (2006)</div>
            </div>

            <div class="section">
                <h2>${isSpanish ? 'HABILIDADES' : 'SKILLS'}</h2>
                <div class="skill-group">
                    <div class="skill-title">SAP & ABAP</div>
                    <div class="skill-list">FI, SD, MM, HR, PM, BAPIs, Enhancements, SmartForms, ALV, OData, SAP PI</div>
                </div>
                <div class="skill-group">
                    <div class="skill-title">Full Stack</div>
                    <div class="skill-list">Go, JavaScript, Python, REST APIs, JWT, HTML/CSS</div>
                </div>
                <div class="skill-group">
                    <div class="skill-title">DevOps</div>
                    <div class="skill-list">Docker, Git, PostgreSQL, SAP HANA, Linux</div>
                </div>
            </div>

            <div class="section">
                <h2>${isSpanish ? 'CERTIFICACIONES' : 'CERTIFICATIONS'}</h2>
                <div class="cert-item">Scrum Master (SMPC) - CertiProf</div>
                <div class="cert-item">Product Owner (SPOPC) - CertiProf</div>
                <div class="cert-item">Agile Coach (ACPC) - CertiProf</div>
                <div class="cert-item">IBM Machine Learning</div>
                <div class="cert-item">SAP UI5 - Logali Group</div>
            </div>

            <div class="section">
                <h2>${isSpanish ? 'IDIOMAS' : 'LANGUAGES'}</h2>
                <div class="cert-item"><strong>${isSpanish ? 'Espanol' : 'Spanish'}:</strong> ${isSpanish ? 'Nativo' : 'Native'}</div>
                <div class="cert-item"><strong>${isSpanish ? 'Ingles' : 'English'}:</strong> ${isSpanish ? 'Intermedio-Alto' : 'Upper-Intermediate'}</div>
            </div>

            <div class="section">
                <h2>${isSpanish ? 'PROYECTOS' : 'PROJECTS'}</h2>
                <div class="cert-item"><strong>Colombia-IA</strong> - colombia-ia.github.io</div>
                <div class="cert-item"><strong>Edge Labs Dev</strong> - edgelabsdev.com</div>
            </div>
        </div>
    </div>

    <div class="footer">
        ${isSpanish ? 'Referencias disponibles a solicitud' : 'References available upon request'} | danielcrincon.github.io
    </div>
</body>
</html>`;

    printWindow.document.write(content);
    printWindow.document.close();
}
