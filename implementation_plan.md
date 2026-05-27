# Implementación de Mejoras en la Página Web

Esta es la propuesta para implementar las 4 áreas de mejora discutidas para elevar la calidad visual, interactividad y posicionamiento de la página de ELECCON Ingeniería.

## User Review Required
> [!IMPORTANT]
> Revisa este plan de implementación para asegurar que los cambios propuestos están alineados con tus expectativas. Necesitaré tu explícita aprobación para comenzar a modificar los archivos y añadir el nuevo código.

## Open Questions
> [!WARNING]
> Para las etiquetas de SEO (Open Graph), configuraremos una ruta genérica para la imagen de previsualización (ej. `assets/og-image.jpg`). Deberás colocar una imagen real en esa ruta más adelante para que se muestre al compartir el enlace. ¿Estás de acuerdo con esto?

## Proposed Changes

---

### 1. Interfaz y Lógica (JavaScript)
Se creará un nuevo archivo para separar la lógica de la vista y agregar interactividad moderna.

#### [NEW] [script.js](file:///c:/Users/EmmanuelACV/Desktop/SIEPRO/EC%20Ing%20Electrica/script.js)
- Implementará la lógica del **menú hamburguesa** (apertura/cierre) para dispositivos móviles.
- Usará `IntersectionObserver` para añadir clases que disparen animaciones suaves al hacer scroll (fade-in, slide-up).
- Interceptará el envío del **formulario de contacto** para evitar que la página se recargue, mostrando un mensaje de agradecimiento.

---

### 2. Estructura y SEO (HTML)
Se actualizará la base de la página para soportar el nuevo diseño y mejorar el SEO.

#### [MODIFY] [index.html](file:///c:/Users/EmmanuelACV/Desktop/SIEPRO/EC%20Ing%20Electrica/index.html)
- **Head:** Inclusión de etiquetas `Open Graph` (`og:title`, `og:description`, `og:type`, etc.) para redes sociales.
- **Navegación:** Agregaremos el botón HTML para el menú hamburguesa dentro del `header`.
- **Iconos de Servicios:** Se reemplazarán los emojis de texto por código SVG de iconos profesionales (ej. estilo Heroicons).
- **Animaciones Base:** Se añadirán clases utilitarias como `.hidden-anim` a las secciones para que el JS las descubra al hacer scroll.
- **Formulario:** Se añadirá un contenedor para el mensaje de éxito post-envío.
- **Scripts:** Se importará el nuevo archivo `script.js` al final del `body`.

---

### 3. Estilos y Estética (CSS)
Se actualizará la hoja de estilos para dar vida a las interacciones.

#### [MODIFY] [styles.css](file:///c:/Users/EmmanuelACV/Desktop/SIEPRO/EC%20Ing%20Electrica/styles.css)
- **Menú Móvil:** CSS específico para transformar la navegación en un menú lateral o desplegable elegante en resoluciones de pantalla pequeñas.
- **Clases de Animación:** Definición de transiciones (`transition: opacity 0.6s, transform 0.6s`) y estados iniciales (desplazado hacia abajo y transparente).
- **Estilos SVG:** Se adaptarán los colores de los nuevos iconos SVG usando las variables de CSS existentes (color de acento y gradientes).
- **Mensaje de Éxito:** Estilos para el texto de confirmación del formulario de contacto.

## Verification Plan

### Manual Verification
1. Redimensionar la ventana del navegador simulando un móvil para verificar que aparece el menú hamburguesa y que al hacer clic se abre suavemente.
2. Recargar la página en la parte superior y hacer scroll hacia abajo para verificar que las tarjetas de servicios y textos aparecen con animaciones fluidas.
3. Rellenar los campos del formulario y enviarlo; verificar que se muestra el mensaje de éxito sin recargar la web.
4. Inspeccionar el código fuente HTML y verificar que el bloque de metaetiquetas `<meta property="og:...">` está correcto.
