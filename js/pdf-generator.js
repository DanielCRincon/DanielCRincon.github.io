document.addEventListener("DOMContentLoaded", function() {
    var btn = document.getElementById("download-cv");
    if (btn) btn.addEventListener("click", printCV);
});

function printCV() {
    var lang = window.i18n?.getCurrentLang() || "es";
    var es = lang === "es";

    // Abrir nueva ventana con el CV para imprimir/guardar como PDF
    var printWindow = window.open("", "_blank", "width=800,height=600");

    printWindow.document.write("<!DOCTYPE html><html><head>");
    printWindow.document.write("<title>CV - Daniel Cabrera Rincon</title>");
    printWindow.document.write("<style>");
    printWindow.document.write(getPrintStyles());
    printWindow.document.write("</style>");
    printWindow.document.write("</head><body>");
    printWindow.document.write(buildCV(es));
    printWindow.document.write("</body></html>");
    printWindow.document.close();

    // Esperar a que cargue y luego imprimir
    printWindow.onload = function() {
        printWindow.focus();
        printWindow.print();
    };
}

function getPrintStyles() {
    return [
        "* { margin: 0; padding: 0; box-sizing: border-box; }",
        "body { font-family: Arial, Helvetica, sans-serif; font-size: 10pt; color: #333; line-height: 1.3; padding: 10mm; background: white; }",
        "@page { size: A4; margin: 8mm; }",
        "@media print { body { padding: 0; } }",
        "h1 { font-size: 18pt; color: #0A192F; text-align: center; margin-bottom: 3px; }",
        "h2 { font-size: 11pt; color: #0A192F; border-bottom: 2px solid #0A192F; padding-bottom: 2px; margin: 10px 0 6px 0; }",
        ".subtitle { text-align: center; color: #555; margin-bottom: 3px; font-size: 10pt; }",
        ".contact-info { text-align: center; font-size: 8pt; color: #666; margin-bottom: 10px; }",
        ".profile { margin-bottom: 8px; font-size: 9pt; }",
        ".job { margin-bottom: 8px; page-break-inside: avoid; }",
        ".job-header { display: flex; justify-content: space-between; align-items: baseline; }",
        ".job-title { font-weight: bold; font-size: 10pt; }",
        ".job-period { font-size: 8pt; color: #666; }",
        ".job-company { font-style: italic; color: #555; font-size: 9pt; margin-bottom: 2px; }",
        ".job-responsibilities { margin-left: 15px; margin-top: 2px; font-size: 9pt; }",
        ".job-responsibilities li { margin-bottom: 1px; }",
        ".job-tags { font-size: 8pt; color: #0A192F; margin-top: 3px; font-style: italic; }",
        ".skills-section { margin-bottom: 8px; font-size: 9pt; }",
        ".skill-group { margin-bottom: 3px; }",
        ".skill-label { font-weight: bold; }",
        ".education-item { margin-bottom: 5px; font-size: 9pt; }",
        ".edu-year { font-weight: bold; color: #0A192F; }",
        ".footer { text-align: center; margin-top: 15px; font-size: 8pt; color: #999; }",
        "ul { margin-left: 15px; margin-top: 2px; }",
        "li { margin-bottom: 1px; }"
    ].join("\n");
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
    html += "<h1>DANIEL CABRERA RINCON</h1>";
    html += "<p class='subtitle'>SAP ABAP Consultant | Full Stack Developer</p>";
    html += "<p class='contact-info'>danielcabrerarincon@gmail.com | +57 322 253 9049<br>";
    html += "linkedin.com/in/daniel-cabrera-ia | github.com/DanielCRincon</p>";

    html += "<h2>" + (es ? "PERFIL PROFESIONAL" : "PROFESSIONAL PROFILE") + "</h2>";
    html += "<p class='profile'>" + profile + "</p>";

    html += "<h2>" + (es ? "EXPERIENCIA PROFESIONAL" : "PROFESSIONAL EXPERIENCE") + "</h2>";

    for (var i = 0; i < topJobs.length; i++) {
        var job = topJobs[i];
        html += "<div class='job'>";
        html += "<div class='job-header'><span class='job-title'>" + job.title + "</span><span class='job-period'>" + job.date + "</span></div>";
        html += "<div class='job-company'>" + job.company + " | " + job.location + "</div>";

        // Usar las descripciones del JSON (array de responsabilidades)
        if (job.description && job.description.length > 0) {
            html += "<ul class='job-responsibilities'>";
            for (var j = 0; j < job.description.length; j++) {
                html += "<li>" + job.description[j] + "</li>";
            }
            html += "</ul>";
        }

        // Tags/tecnologías
        if (job.tags && job.tags.length > 0) {
            html += "<div class='job-tags'>" + job.tags.join(" | ") + "</div>";
        }

        html += "</div>";
    }

    html += "<h2>" + (es ? "HABILIDADES TECNICAS" : "TECHNICAL SKILLS") + "</h2>";
    html += "<div class='skills-section'>";
    html += "<div class='skill-group'><span class='skill-label'>SAP:</span> FI, SD, MM, HR, PM, BAPIs, User Exits, Enhancements, SmartForms, ALV, RFC, OData, SAP Gateway</div>";
    html += "<div class='skill-group'><span class='skill-label'>Development:</span> Go, JavaScript, Python, C#, HTML5, CSS3, REST APIs, Docker, Git</div>";
    html += "<div class='skill-group'><span class='skill-label'>Databases:</span> PostgreSQL, SAP HANA, SQLite, SQL</div>";
    html += "<div class='skill-group'><span class='skill-label'>" + (es ? "Metodologias" : "Methodologies") + ":</span> Scrum, Agile, PMI</div>";
    html += "</div>";

    html += "<h2>" + (es ? "EDUCACION" : "EDUCATION") + "</h2>";
    html += "<div class='education-item'><span class='edu-year'>2022</span> - " + (es ? "Ingeniero de Software" : "Software Engineer") + " - Politecnico GranColombiano</div>";
    html += "<div class='education-item'><span class='edu-year'>2006</span> - " + (es ? "Ingeniero Industrial" : "Industrial Engineer") + " - Escuela Colombiana de Ingenieria</div>";

    html += "<h2>" + (es ? "CERTIFICACIONES" : "CERTIFICATIONS") + "</h2>";
    html += "<ul>";
    html += "<li>Scrum Master Professional (SMPC) - CertiProf</li>";
    html += "<li>Scrum Product Owner Professional (SPOPC) - CertiProf</li>";
    html += "<li>Agile Coach Professional (ACPC) - CertiProf</li>";
    html += "<li>IBM Machine Learning Foundations - IBM</li>";
    html += "<li>SAP UI5 - Logali Group</li>";
    html += "</ul>";

    html += "<p class='footer'>danielcrincon.github.io</p>";

    return html;
}
