document.addEventListener("DOMContentLoaded", function() {
    var btn = document.getElementById("download-cv");
    if (btn) btn.addEventListener("click", generatePDF);
});

async function generatePDF() {
    var btn = document.getElementById("download-cv");
    var lang = window.i18n?.getCurrentLang() || "es";
    var es = lang === "es";

    if (btn) {
        btn.disabled = true;
        btn.innerHTML = "<i class=\"fas fa-spinner fa-spin\"></i> " + (es ? "Generando..." : "Generating...");
    }

    try {
        var div = document.createElement("div");
        div.innerHTML = buildCV(es);
        div.style.cssText = "position:absolute;left:-9999px;width:210mm";
        document.body.appendChild(div);

        await html2pdf().set({
            margin: 10,
            filename: "CV_Daniel_Cabrera_" + lang.toUpperCase() + ".pdf",
            image: {type:"jpeg",quality:0.98},
            html2canvas: {scale:2,useCORS:true},
            jsPDF: {unit:"mm",format:"a4",orientation:"portrait"}
        }).from(div).save();

        document.body.removeChild(div);
    } catch(e) {
        console.error(e);
        alert(es ? "Error al generar PDF" : "Error generating PDF");
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = "<i class=\"fas fa-download\"></i> " + (es ? "Descargar CV" : "Download CV");
        }
    }
}

function buildCV(es) {
    return "<div style=\"font-family:Arial;font-size:11px;color:#333;padding:20px;background:white\">" +
    "<h1 style=\"font-size:22px;color:#0A192F;text-align:center;margin:0\">DANIEL CABRERA RINCON</h1>" +
    "<p style=\"text-align:center;margin:5px 0\">SAP ABAP Consultant | Full Stack Developer</p>" +
    "<p style=\"text-align:center;font-size:10px;color:#555\">danielcabrerarincon@gmail.com | +57 322 253 9049<br>linkedin.com/in/daniel-cabrera-ia | github.com/DanielCRincon</p>" +
    "<h2 style=\"font-size:13px;color:#0A192F;border-bottom:2px solid #0A192F;margin-top:15px\">" + (es?"PERFIL":"PROFILE") + "</h2>" +
    "<p>" + (es?"Ingeniero de Software e Industrial con +13 anos en SAP ABAP. Full Stack con Go, PostgreSQL, Docker.":"Software Engineer with +13 years in SAP ABAP. Full Stack with Go, PostgreSQL, Docker.") + "</p>" +
    "<h2 style=\"font-size:13px;color:#0A192F;border-bottom:2px solid #0A192F\">" + (es?"EXPERIENCIA":"EXPERIENCE") + "</h2>" +
    "<p><b>Full Stack Developer - EdgeLabsDev</b> (2025-Present)</p>" +
    "<p><b>SAP ABAP Developer - Star Net Consulting</b> (2024-Present)</p>" +
    "<p><b>ABAP HR-FI Developer - SMX Services</b> (2024-Present)</p>" +
    "<p><b>" + (es?"Lider Aplicaciones":"Applications Leader") + " - Lab. La Sante</b> (2023-2024)</p>" +
    "<p><b>ABAP Developer - HR Solutions</b> (2023)</p>" +
    "<p><b>" + (es?"Coordinador ABAP":"ABAP Coordinator") + " - Nortesantandereana</b> (2017-2023)</p>" +
    "<h2 style=\"font-size:13px;color:#0A192F;border-bottom:2px solid #0A192F\">" + (es?"HABILIDADES":"SKILLS") + "</h2>" +
    "<p><b>SAP:</b> FI, SD, MM, HR, BAPIs, SmartForms, ALV, OData</p>" +
    "<p><b>Dev:</b> Go, JavaScript, Python, Docker, PostgreSQL, Git</p>" +
    "<h2 style=\"font-size:13px;color:#0A192F;border-bottom:2px solid #0A192F\">" + (es?"EDUCACION":"EDUCATION") + "</h2>" +
    "<p>" + (es?"Ing. Software":"Software Eng.") + " - Politecnico GranColombiano (2022)</p>" +
    "<p>" + (es?"Ing. Industrial":"Industrial Eng.") + " - Escuela Colombiana Ingenieria (2006)</p>" +
    "<p style=\"text-align:center;margin-top:20px;font-size:9px;color:#999\">danielcrincon.github.io</p></div>";
}
