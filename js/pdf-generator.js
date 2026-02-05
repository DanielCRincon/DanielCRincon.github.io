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
        "body { font-family: Arial, Helvetica, sans-serif; font-size: 11pt; color: #333; line-height: 1.4; padding: 15mm; background: white; }",
        "@page { size: A4; margin: 10mm; }",
        "@media print { body { padding: 0; } }",
        "h1 { font-size: 20pt; color: #0A192F; text-align: center; margin-bottom: 5px; }",
        "h2 { font-size: 12pt; color: #0A192F; border-bottom: 2px solid #0A192F; padding-bottom: 3px; margin: 15px 0 8px 0; }",
        "h3 { font-size: 11pt; margin: 8px 0 3px 0; }",
        ".subtitle { text-align: center; color: #555; margin-bottom: 5px; }",
        ".contact-info { text-align: center; font-size: 9pt; color: #666; margin-bottom: 15px; }",
        ".profile { margin-bottom: 10px; }",
        ".job { margin-bottom: 10px; page-break-inside: avoid; }",
        ".job-header { display: flex; justify-content: space-between; align-items: baseline; }",
        ".job-title { font-weight: bold; }",
        ".job-period { font-size: 9pt; color: #666; }",
        ".job-company { font-style: italic; color: #555; }",
        ".skills-section { margin-bottom: 10px; }",
        ".skill-group { margin-bottom: 5px; }",
        ".skill-label { font-weight: bold; }",
        ".education-item { margin-bottom: 8px; }",
        ".edu-year { font-weight: bold; color: #0A192F; }",
        ".footer { text-align: center; margin-top: 20px; font-size: 8pt; color: #999; }",
        "ul { margin-left: 20px; margin-top: 3px; }",
        "li { margin-bottom: 2px; }"
    ].join("\n");
}

function buildCV(es) {
    var profile = es
        ? "Ingeniero de Software e Industrial con mas de 13 anos de experiencia en SAP ABAP. Especializado en modulos FI, SD, MM y HR. Actualmente expandiendo perfil como Desarrollador Full Stack con Go, PostgreSQL y Docker. Fundador de Colombia-IA, iniciativa open-source para democratizar la inteligencia artificial."
        : "Software and Industrial Engineer with 13+ years of SAP ABAP experience. Specialized in FI, SD, MM, and HR modules. Currently expanding profile as Full Stack Developer with Go, PostgreSQL, and Docker. Founder of Colombia-IA, an open-source initiative to democratize AI.";

    var jobs = [
        {
            title: "Full Stack Developer",
            company: "EdgeLabsDev",
            period: "2025 - " + (es ? "Presente" : "Present"),
            desc: es
                ? "Desarrollo de soluciones web empresariales con Go, PostgreSQL y Docker."
                : "Enterprise web solutions development with Go, PostgreSQL, and Docker."
        },
        {
            title: "SAP ABAP Developer",
            company: "Star Net Consulting",
            period: "2024 - " + (es ? "Presente" : "Present"),
            desc: es
                ? "Desarrollo ABAP para clientes corporativos en modulos FI/SD/MM."
                : "ABAP development for corporate clients in FI/SD/MM modules."
        },
        {
            title: "ABAP HR-FI Developer",
            company: "SMX Services",
            period: "2024 - " + (es ? "Presente" : "Present"),
            desc: es
                ? "Especializacion en integracion HR-FI, reportes y automatizaciones."
                : "Specialization in HR-FI integration, reports, and automations."
        },
        {
            title: es ? "Lider de Aplicaciones" : "Applications Leader",
            company: "Laboratorios La Sante",
            period: "2023 - 2024",
            desc: es
                ? "Liderazgo de equipo de desarrollo y gestion de proyectos SAP."
                : "Development team leadership and SAP project management."
        },
        {
            title: "ABAP Developer",
            company: "HR Solutions",
            period: "2023",
            desc: es
                ? "Desarrollo de soluciones HR en SAP, nomina y gestion de personal."
                : "SAP HR solutions development, payroll, and personnel management."
        },
        {
            title: es ? "Coordinador ABAP" : "ABAP Coordinator",
            company: "Nortesantandereana de Gas",
            period: "2017 - 2023",
            desc: es
                ? "Coordinacion del equipo ABAP, desarrollo en FI/SD/MM/PM."
                : "ABAP team coordination, development in FI/SD/MM/PM."
        }
    ];

    var html = "";
    html += "<h1>DANIEL CABRERA RINCON</h1>";
    html += "<p class='subtitle'>SAP ABAP Consultant | Full Stack Developer</p>";
    html += "<p class='contact-info'>danielcabrerarincon@gmail.com | +57 322 253 9049<br>";
    html += "linkedin.com/in/daniel-cabrera-ia | github.com/DanielCRincon</p>";

    html += "<h2>" + (es ? "PERFIL PROFESIONAL" : "PROFESSIONAL PROFILE") + "</h2>";
    html += "<p class='profile'>" + profile + "</p>";

    html += "<h2>" + (es ? "EXPERIENCIA PROFESIONAL" : "PROFESSIONAL EXPERIENCE") + "</h2>";
    for (var i = 0; i < jobs.length; i++) {
        var job = jobs[i];
        html += "<div class='job'>";
        html += "<div class='job-header'><span class='job-title'>" + job.title + "</span><span class='job-period'>" + job.period + "</span></div>";
        html += "<div class='job-company'>" + job.company + "</div>";
        html += "<p>" + job.desc + "</p>";
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
