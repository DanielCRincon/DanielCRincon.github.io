document.addEventListener("DOMContentLoaded", function() {
    var btn = document.getElementById("download-cv");
    if (btn) btn.addEventListener("click", downloadCV);
});

function downloadCV() {
    var lang = window.i18n?.getCurrentLang() || "es";
    var es = lang === "es";

    // Crear un elemento temporal con el contenido del CV
    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = buildCV(es);
    tempDiv.style.cssText = getPrintStyles();
    
    // Configurar opciones de html2pdf - versión simple y funcional
    var opt = {
        margin: 10,
        filename: es ? 'Daniel_Cabrera_Rincon_CV_ES.pdf' : 'Daniel_Cabrera_Rincon_CV_EN.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Generar y descargar el PDF
    html2pdf().set(opt).from(tempDiv).save();
}

function getPrintStyles() {
    return "font-family: Arial, Helvetica, sans-serif; font-size: 10pt; color: #333; line-height: 1.3; padding: 10mm; background: white; word-wrap: break-word; overflow-wrap: break-word;";
}

function buildCV(es) {
    // Obtener datos del JSON de traducciones
    var translations = window.i18n?.getCurrentTranslations();
    var jobs = translations?.experience?.jobs || [];

    // Limitar a los primeros 6 trabajos más relevantes para el PDF
    var topJobs = jobs.slice(0, 6);

    var profile = es
        ? "Ingeniero de Software e Industrial con mas de 13 anos de experiencia en SAP ABAP. Especializado en modulos FI, SD, MM y HR. Actualmente expandiendo perfil como Desarrollador Full Stack con Go, PostgreSQL y Docker. Fundador de Colombia-IA, iniciativa open-source para democratizar la inteligencia artificial."
        : "Software and Industrial Engineer with 13+ years of SAP ABAP experience. Specialized in FI, SD, MM, and HR modules. Currently expanding profile as Full Stack Developer with Go, PostgreSQL, and Docker. Founder of Colombia-IA, an open-source initiative to democratize AI.";

    var html = "";
    html += "<div style='font-family: Arial, Helvetica, sans-serif; font-size: 10pt; color: #333; line-height: 1.3; padding: 10mm; background: white; word-wrap: break-word; overflow-wrap: break-word;'>";
    
    html += "<h1 style='font-size: 18pt; color: #0A192F; text-align: center; margin-bottom: 3px;'>DANIEL CABRERA RINCON</h1>";
    html += "<p style='text-align: center; color: #555; margin-bottom: 3px; font-size: 10pt;'>SAP ABAP Consultant | Full Stack Developer</p>";
    html += "<p style='text-align: center; font-size: 8pt; color: #666; margin-bottom: 10px;'>danielcabrerarincon@gmail.com | +57 322 253 9049<br>linkedin.com/in/daniel-cabrera-ia | github.com/DanielCRincon</p>";

    html += "<h2 style='font-size: 11pt; color: #0A192F; border-bottom: 2px solid #0A192F; padding-bottom: 2px; margin: 10px 0 6px 0;'>" + (es ? "PERFIL PROFESIONAL" : "PROFESSIONAL PROFILE") + "</h2>";
    html += "<p style='margin-bottom: 8px; font-size: 9pt;'>" + profile + "</p>";

    html += "<h2 style='font-size: 11pt; color: #0A192F; border-bottom: 2px solid #0A192F; padding-bottom: 2px; margin: 10px 0 6px 0;'>" + (es ? "EXPERIENCIA PROFESIONAL" : "PROFESSIONAL EXPERIENCE") + "</h2>";

    for (var i = 0; i < topJobs.length; i++) {
        var job = topJobs[i];
        html += "<div style='margin-bottom: 8px; page-break-inside: avoid;'>";
        html += "<div style='display: flex; justify-content: space-between; align-items: baseline;'><span style='font-weight: bold; font-size: 10pt;'>" + job.title + "</span><span style='font-size: 8pt; color: #666;'>" + job.date + "</span></div>";
        html += "<div style='font-style: italic; color: #555; font-size: 9pt; margin-bottom: 2px;'>" + job.company + " | " + job.location + "</div>";

        // Usar las descripciones del JSON (array de responsabilidades)
        if (job.description && job.description.length > 0) {
            html += "<ul style='margin-left: 15px; margin-top: 2px; font-size: 9pt;'>";
            for (var j = 0; j < job.description.length; j++) {
                html += "<li style='margin-bottom: 1px;'>" + job.description[j] + "</li>";
            }
            html += "</ul>";
        }

        // Tags/tecnologías - solo agregar wrapping básico
        if (job.tags && job.tags.length > 0) {
            html += "<div style='font-size: 8pt; color: #0A192F; margin-top: 3px; font-style: italic; word-wrap: break-word; overflow-wrap: break-word;'>" + job.tags.join(" | ") + "</div>";
        }

        html += "</div>";
    }

    html += "<h2 style='font-size: 11pt; color: #0A192F; border-bottom: 2px solid #0A192F; padding-bottom: 2px; margin: 10px 0 6px 0;'>" + (es ? "HABILIDADES TECNICAS" : "TECHNICAL SKILLS") + "</h2>";
    html += "<div style='margin-bottom: 8px; font-size: 9pt;'>";
    html += "<div style='margin-bottom: 3px;'><span style='font-weight: bold;'>SAP:</span> FI, SD, MM, HR, PM, BAPIs, User Exits, Enhancements, SmartForms, ALV, RFC, OData, SAP Gateway</div>";
    html += "<div style='margin-bottom: 3px;'><span style='font-weight: bold;'>Development:</span> Go, JavaScript, Python, C#, HTML5, CSS3, REST APIs, Docker, Git</div>";
    html += "<div style='margin-bottom: 3px;'><span style='font-weight: bold;'>Databases:</span> PostgreSQL, SAP HANA, SQLite, SQL</div>";
    html += "<div style='margin-bottom: 3px;'><span style='font-weight: bold;'>" + (es ? "Metodologias" : "Methodologies") + ":</span> Scrum, Agile, PMI</div>";
    html += "</div>";

    html += "<h2 style='font-size: 11pt; color: #0A192F; border-bottom: 2px solid #0A192F; padding-bottom: 2px; margin: 10px 0 6px 0;'>" + (es ? "EDUCACION" : "EDUCATION") + "</h2>";
    html += "<div style='margin-bottom: 5px; font-size: 9pt;'><span style='font-weight: bold; color: #0A192F;'>2022</span> - " + (es ? "Ingeniero de Software" : "Software Engineer") + " - Politecnico GranColombiano</div>";
    html += "<div style='margin-bottom: 5px; font-size: 9pt;'><span style='font-weight: bold; color: #0A192F;'>2006</span> - " + (es ? "Ingeniero Industrial" : "Industrial Engineer") + " - Escuela Colombiana de Ingenieria</div>";

    html += "<h2 style='font-size: 11pt; color: #0A192F; border-bottom: 2px solid #0A192F; padding-bottom: 2px; margin: 10px 0 6px 0;'>" + (es ? "CERTIFICACIONES" : "CERTIFICATIONS") + "</h2>";
    html += "<ul style='margin-left: 15px; margin-top: 2px;'>";
    html += "<li style='margin-bottom: 1px;'>Scrum Master Professional (SMPC) - CertiProf</li>";
    html += "<li style='margin-bottom: 1px;'>Scrum Product Owner Professional (SPOPC) - CertiProf</li>";
    html += "<li style='margin-bottom: 1px;'>Agile Coach Professional (ACPC) - CertiProf</li>";
    html += "<li style='margin-bottom: 1px;'>IBM Machine Learning Foundations - IBM</li>";
    html += "<li style='margin-bottom: 1px;'>SAP UI5 - Logali Group</li>";
    html += "</ul>";

    html += "<p style='text-align: center; margin-top: 15px; font-size: 8pt; color: #999;'>danielcrincon.github.io</p>";
    html += "</div>";

    return html;
}
