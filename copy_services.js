const fs = require('fs');

let srcCode = fs.readFileSync('code_agregados_servicios.html', 'utf8');
let destCode = fs.readFileSync('servicios.html', 'utf8');

// 1. Extract the grid from srcCode
let startIndex = srcCode.indexOf('<div class="grid grid-cols-1 md:grid-cols-12 gap-gutter">');
let endIndex = srcCode.indexOf('</main>'); // The grid is the last thing before </main>
let gridHtml = srcCode.substring(startIndex, endIndex).trim();

// Ensure we only grab the grid itself (remove closing </div> of main if any)
if (gridHtml.endsWith('</div>\n</div>')) {
    // Actually just find the exact boundaries by counting divs, or use a reliable regex.
    // In code_agregados_servicios.html, the grid ends right before </main>
}

// Let's refine the extraction:
const gridStartPattern = '<!-- Services Grid (Bento Style) -->';
startIndex = srcCode.indexOf(gridStartPattern);
let gridHtmlToInject = srcCode.substring(startIndex, endIndex).trim();
// removing trailing </div> of some parent if present?
// Actually in code_agregados_servicios.html:
// <div class="grid ..."> ... </div>
// </main>
// So it ends with </div>.
if (gridHtmlToInject.endsWith('</div>')) {
    // Correct
}

// 2. Adapt to Light Theme
// Replace bg-surface-container-lowest with bg-surface + shadow
gridHtmlToInject = gridHtmlToInject.replaceAll('bg-surface-container-lowest', 'bg-surface shadow-sm hover:shadow-md transition-shadow');
// Replace dark mode specific text colors if necessary
gridHtmlToInject = gridHtmlToInject.replaceAll('text-primary-fixed-dim', 'text-primary font-bold');


// 3. Inject into servicios.html
// We will insert it right after the existing grid (which ends with </div>\n</div>\n</section>)
// Let's find the end of the existing grid section.
const injectionPattern = /<\/div>\s*<\/div>\s*<\/section>\s*<section class="w-full py-24 px-margin-mobile/;
const match = destCode.match(injectionPattern);

if (match) {
    const injectionPoint = match.index;
    
    // We will inject a new section for this bento grid
    const newSection = `
        <!-- New Bento Grid Section -->
        <section class="w-full py-24 px-margin-mobile md:px-margin-desktop bg-surface border-t border-outline-variant">
            <div class="max-w-container-max mx-auto">
                <div class="mb-12">
                    <h2 class="font-headline-lg text-headline-lg text-primary uppercase">Specialized Solutions</h2>
                    <p class="font-body-lg text-on-surface-variant mt-2">Advanced engineering capabilities for industrial environments.</p>
                </div>
                ${gridHtmlToInject}
            </div>
        </section>
    `;

    // Insert newSection right before the matching pattern
    const newHtml = destCode.substring(0, injectionPoint + match[0].indexOf('</section>') + 10) + '\n' + newSection + destCode.substring(injectionPoint + match[0].indexOf('</section>') + 10);
    
    fs.writeFileSync('servicios.html', newHtml, 'utf8');
    console.log('Successfully injected the bento grid.');
} else {
    console.log('Could not find injection point.');
}
