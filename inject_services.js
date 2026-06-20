const fs = require('fs');

// 1. Read the data file
const dataFileContent = fs.readFileSync('servicios-data.js', 'utf8');

let match = dataFileContent.match(/\[[\s\S]*\]/);
const serviciosData = eval('(' + match[0] + ')');

// 2. Map of related images
const imageUrls = {
    "planos": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "boletas": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "medidor": "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "mantenimiento": "https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "automatizacion": "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "cortocircuitos": "https://images.unsplash.com/photo-1544724569-5f546fd6f2b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "incendio": "https://images.unsplash.com/photo-1582214400494-1b489a202271?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "cctv": "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
};

const fallbackImage = "https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";

// 3. Generate HTML for the 8 cards
let cardsHtml = '';
serviciosData.forEach((servicio, index) => {
    const sId = servicio.id;
    const image = imageUrls[sId] || fallbackImage;
    const title = servicio.titulo;
    const subtitle = servicio.subtitulo;
    
    let stepsHtml = '';
    if (servicio.proceso && servicio.proceso.length > 0) {
        stepsHtml = '<ul class="space-y-2 font-label-md text-label-md text-on-surface-variant mb-8 border-t border-outline-variant pt-4">';
        servicio.proceso.forEach(paso => {
            stepsHtml += '\n<li class="flex items-center"><span class="material-symbols-outlined text-primary-container mr-2 text-sm">check_circle</span> ' + paso.titulo + '</li>';
        });
        stepsHtml += '\n</ul>';
    }

    const indexNumber = index + 3;
    const formattedNumber = indexNumber < 10 ? '0' + indexNumber : indexNumber;

    const card = `
<!-- Service ${indexNumber} -->
<div class="bg-surface border border-outline-variant shadow-sm hover:shadow-md transition-shadow flex flex-col group relative overflow-hidden">
<div class="h-64 bg-surface-container relative border-b border-outline-variant">
<div class="bg-cover bg-center w-full h-full opacity-90 grayscale group-hover:grayscale-0 transition-all duration-500" data-alt="${title}" style="background-image: url('${image}')"></div>
<div class="absolute top-4 left-4 bg-white px-2 py-1 border border-outline-variant font-label-sm text-label-sm  font-bold">S-${formattedNumber}</div>
</div>
<div class="p-8 flex-grow flex flex-col">
<h3 class="font-headline-md text-headline-md text-primary mb-4 uppercase">${title}</h3>
<p class="font-body-md text-body-md text-on-surface-variant mb-6">
    ${subtitle}
</p>
${stepsHtml}
<div class="mt-auto">
<button class="font-label-md text-label-md text-primary font-bold uppercase tracking-widest flex items-center hover:text-primary-container transition-colors ">
                                    View Specs <span class="material-symbols-outlined ml-1 text-sm">arrow_forward</span>
</button>
</div>
</div>
</div>`;
    cardsHtml += card;
});

// 4. Inject into servicios.html
let html = fs.readFileSync('servicios.html', 'utf8');

// Find the closing divs for the grid
const searchPattern = /<\/div>\s*<\/div>\s*<\/section>\s*<section class="py-24/;
const htmlMatch = html.match(searchPattern);

if (htmlMatch) {
    const injectionPoint = htmlMatch.index;
    const newHtml = html.substring(0, injectionPoint) + '\n' + cardsHtml + '\n</div>\n</div>\n</section>\n        <section class="py-24' + html.substring(injectionPoint + htmlMatch[0].length);
    fs.writeFileSync('servicios.html', newHtml, 'utf8');
    console.log('Successfully injected 8 new cards.');
} else {
    console.error('Could not find injection point');
}
