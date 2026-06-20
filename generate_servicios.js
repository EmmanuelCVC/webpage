const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');
const codeServiciosHtml = fs.readFileSync('code_servicios.html', 'utf8');

// Extraer el HEAD de index.html
const headMatch = indexHtml.match(/<head>[\s\S]*?<\/head>/);
const headStr = headMatch ? headMatch[0] : '';

// Extraer Navbar de index.html
const navMatch = indexHtml.match(/<nav[\s\S]*?<\/nav>/);
const navStr = navMatch ? navMatch[0] : '';

// Extraer Footer de index.html
const footerMatch = indexHtml.match(/<footer[\s\S]*?<\/footer>/);
const footerStr = footerMatch ? footerMatch[0] : '';

// Extraer secciones de code_servicios.html
const sections = codeServiciosHtml.match(/<section[\s\S]*?<\/section>/g);

if (!sections || sections.length < 3) {
    console.error("No se encontraron las secciones en code_servicios.html");
    process.exit(1);
}

// Limpiar y adaptar clases de code_servicios.html
let heroSection = sections[0];
let gridSection = sections[1];
let processSection = sections[2];

function adaptClasses(html) {
    return html
        .replace(/font-rajdhani/g, '')
        .replace(/bg-\[#E5E5E5\]/g, 'bg-surface-container')
        .replace(/blueprint-grid/g, 'blueprint-bg')
        .replace(/text-secondary-container/g, 'text-primary-container')
        .replace(/btn-safety/g, 'btn-primary')
        .replace(/card-border/g, 'border border-outline-variant shadow-sm hover:shadow-md transition-shadow')
        .replace(/bg-surface-container-lowest/g, 'bg-surface')
        .replace(/bg-surface-dim/g, 'bg-surface-container')
        .replace(/text-secondary-fixed/g, 'text-primary-container')
        .replace(/text-on-primary-container/g, 'text-on-surface-variant')
        .replace(/text-secondary/g, 'text-primary-container');
}

heroSection = adaptClasses(heroSection);
gridSection = adaptClasses(gridSection);
processSection = adaptClasses(processSection);

// Construir el documento final
const newHtml = `<!DOCTYPE html>
<html lang="es" style="">
${headStr}
<body class="bg-background text-on-surface font-body-md antialiased min-h-screen flex flex-col blueprint-bg">

    <!-- TopNavBar -->
    ${navStr}

    <!-- Main Content -->
    <main class="flex-grow flex flex-col items-center w-full mt-[60px]">
        ${heroSection}
        ${gridSection}
        ${processSection}
    </main>

    <!-- Footer -->
    ${footerStr}

    <script src="script.js"></script>
    
    <!-- Scroll to Top Button -->
    <a href="#" class="scroll-top-btn hidden fixed bottom-6 right-6 bg-primary-container text-on-primary-container p-3 rounded-full shadow-md hover:bg-primary transition-all z-50">
        <span class="material-symbols-outlined">expand_less</span>
    </a>
</body>
</html>`;

fs.writeFileSync('servicios.html', newHtml, 'utf8');
console.log('Successfully generated servicios.html');
