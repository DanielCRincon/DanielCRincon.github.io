/**
 * PDF Generator - Simplified Version
 */

document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn = document.getElementById('download-cv');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', generatePDF);
    }
});

async function generatePDF() {
    const btn = document.getElementById('download-cv');
    const originalHTML = btn.innerHTML;

    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generando...';
    btn.disabled = true;

    try {
        // Get current language
        const lang = window.i18n?.getCurrentLang() || 'es';
        const isSpanish = lang === 'es';

        // Create simple HTML content
        const content = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; font-size: 11px; line-height: 1.4; color: #333; }
        .container { padding: 20px; max-width: 800px; }
        h1 { font-size: 22px; color: #0A192F; text-align: center; margin-bottom: 5px; }
        h2 { font-size: 13px; color: #0A192F; border-bottom: 2px solid #0A192F; padding-bottom: 3px; margin: 15px 0 10px 0; }
        h3 { font-size: 11px; color: #0A192F; margin-bottom: 2px; }
        .subtitle { text-align: center; color: #333; margin-bottom: 10px; font-size: 12px; }
        .contact { text-align: center; font-size: 10px; color: #666; margin-bottom: 15px; }
        .section { margin-bottom: 15px; }
        .job { margin-bottom: 12px; }
        .job-header { display: flex; justify-content: space-between; }
        .job-title { font-weight: bold; }
        .job-date { color: #0A192F; font-size: 10px; }
        .job-company { color: #666; font-style: italic; font-size: 10px; margin-bottom: 5px; }
        ul { padding-left: 15px; font-size: 10px; }
        li { margin-bottom: 2px; }
        .skills-grid { display: flex; flex-wrap: wrap; gap: 10px; }
        .skill-group { flex: 1; min-width: 45%; }
        .skill-title { font-weight: bold; font-size: 10px; color: #0A192F; }
        .skill-list { font-size: 9px; color: #666; }
        .two-col { display: flex; gap: 20px; }
        .col { flex: 1; }
        .cert-item { font-size: 10px; margin-bottom: 3px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>DANIEL CABRERA RINCON</h1>
        <div class="subtitle">SAP ABAP Consultant | Full Stack Developer</div>
        <div class="contact">
            danielcabrerarincon@gmail.com | +57 322 253 9049 | linkedin.com/in/daniel-cabrera-ia | github.com/DanielCRincon<br>
            Bogota, Colombia
        </div>

        <div class="section">
            <h2>${isSpanish ? 'PERFIL PROFESIONAL' : 'PROFESSIONAL PROFILE'}</h2>
            <p>${isSpanish
                ? 'Ingeniero de Software e Industrial con +13 anos de experiencia en SAP ABAP (FI, SD, MM, HR). Especializado en integraciones, BAPIs y personalizaciones. Desarrollador Full Stack con Go, PostgreSQL y Docker. Fundador de Colombia-IA.'
                : 'Software and Industrial Engineer with +13 years of experience in SAP ABAP (FI, SD, MM, HR). Specialized in integrations, BAPIs and customizations. Full Stack Developer with Go, PostgreSQL and Docker. Founder of Colombia-IA.'
            }</p>
        </div>

        <div class="section">
            <h2>${isSpanish ? 'EXPERIENCIA LABORAL' : 'WORK EXPERIENCE'}</h2>

            <div class="job">
                <div class="job-header">
                    <span class="job-title">Full Stack Developer - EdgeLabsDev</span>
                    <span class="job-date">${isSpanish ? 'Ene 2025 - Presente' : 'Jan 2025 - Present'}</span>
                </div>
                <div class="job-company">Remoto</div>
                <ul>
                    <li>${isSpanish ? 'Desarrollo frontend/backend con Go y APIs REST' : 'Frontend/backend development with Go and REST APIs'}</li>
                    <li>${isSpanish ? 'Implementacion de seguridad JWT y Docker' : 'JWT security and Docker implementation'}</li>
                </ul>
            </div>

            <div class="job">
                <div class="job-header">
                    <span class="job-title">SAP ABAP Developer - Star Net Consulting</span>
                    <span class="job-date">${isSpanish ? 'Nov 2024 - Presente' : 'Nov 2024 - Present'}</span>
                </div>
                <div class="job-company">Remoto</div>
                <ul>
                    <li>${isSpanish ? 'Desarrollo de reportes ALV y servicios OData' : 'ALV reports and OData services development'}</li>
                    <li>${isSpanish ? 'Integracion con BAPIs y optimizacion de codigo' : 'BAPIs integration and code optimization'}</li>
                </ul>
            </div>

            <div class="job">
                <div class="job-header">
                    <span class="job-title">ABAP HR-FI Developer - SMX Services</span>
                    <span class="job-date">${isSpanish ? 'Dic 2024 - Presente' : 'Dec 2024 - Present'}</span>
                </div>
                <div class="job-company">Remoto</div>
                <ul>
                    <li>${isSpanish ? 'Desarrollo en SAP HR con SmartForms y HRFORM' : 'SAP HR development with SmartForms and HRFORM'}</li>
                    <li>${isSpanish ? 'Integracion SAP PI y mantenimiento de infotipos' : 'SAP PI integration and infotypes maintenance'}</li>
                </ul>
            </div>

            <div class="job">
                <div class="job-header">
                    <span class="job-title">${isSpanish ? 'Lider de Aplicaciones - Lab. La Sante' : 'Applications Leader - Lab. La Sante'}</span>
                    <span class="job-date">${isSpanish ? 'Nov 2023 - Nov 2024' : 'Nov 2023 - Nov 2024'}</span>
                </div>
                <div class="job-company">Bogota, Colombia</div>
                <ul>
                    <li>${isSpanish ? 'Desarrollo ABAP en modulos SD y FI' : 'ABAP development in SD and FI modules'}</li>
                    <li>${isSpanish ? 'Migracion ECC a SAP HANA' : 'ECC to SAP HANA migration'}</li>
                </ul>
            </div>

            <div class="job">
                <div class="job-header">
                    <span class="job-title">ABAP Developer - HR Solutions</span>
                    <span class="job-date">${isSpanish ? 'Jun - Nov 2023' : 'Jun - Nov 2023'}</span>
                </div>
                <div class="job-company">Remoto</div>
                <ul>
                    <li>${isSpanish ? 'Desarrollo SAP HR/HCM con SuccessFactors' : 'SAP HR/HCM development with SuccessFactors'}</li>
                </ul>
            </div>

            <div class="job">
                <div class="job-header">
                    <span class="job-title">${isSpanish ? 'Coordinador / Dev ABAP - Nortesantandereana de Gas' : 'Coordinator / ABAP Dev - Nortesantandereana de Gas'}</span>
                    <span class="job-date">2017 - 2023</span>
                </div>
                <div class="job-company">Bogota, Colombia</div>
                <ul>
                    <li>${isSpanish ? 'Desarrollo ABAP y gestion de proyectos Scrum' : 'ABAP development and Scrum project management'}</li>
                </ul>
            </div>
        </div>

        <div class="two-col">
            <div class="col">
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
                    <div class="skill-group">
                        <div class="skill-title">${isSpanish ? 'Metodologias' : 'Methodologies'}</div>
                        <div class="skill-list">Scrum, Agile, PMI</div>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="section">
                    <h2>${isSpanish ? 'EDUCACION' : 'EDUCATION'}</h2>
                    <div class="cert-item"><strong>${isSpanish ? 'Ing. de Software' : 'Software Engineer'}</strong> - Politecnico GranColombiano (2022)</div>
                    <div class="cert-item"><strong>${isSpanish ? 'Ing. Industrial' : 'Industrial Engineer'}</strong> - Escuela Colombiana de Ingenieria (2006)</div>
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
            </div>
        </div>

        <div style="text-align: center; margin-top: 15px; font-size: 9px; color: #999;">
            ${isSpanish ? 'Referencias disponibles a solicitud' : 'References available upon request'} | danielcrincon.github.io
        </div>
    </div>
</body>
</html>`;

        // Create container
        const container = document.createElement('div');
        container.innerHTML = content;
        container.style.cssText = 'position: absolute; left: -9999px; top: 0; width: 210mm; background: white;';
        document.body.appendChild(container);

        // Wait for render
        await new Promise(r => setTimeout(r, 200));

        // Generate PDF
        const opt = {
            margin: 5,
            filename: `CV_Daniel_Cabrera_${lang.toUpperCase()}.pdf`,
            image: { type: 'jpeg', quality: 0.95 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        await html2pdf().set(opt).from(container).save();
        document.body.removeChild(container);

    } catch (error) {
        console.error('PDF Error:', error);
        alert('Error generando PDF. Intenta de nuevo.');
    } finally {
        btn.innerHTML = originalHTML;
        btn.disabled = false;
    }
}
