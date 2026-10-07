# Juris Abogados

Demo de despacho jurídico solicitada por Ismael: sistema de GM y fondo de Antisarro Shop, WhatsApp 8115191418.

## Referencias reutilizadas

- Sistema y estructura: `riosdigitali-create/GM`, `index.html`, blob `7ef637d509ebd9e2932a89fe76222412a3ad8df8`.
- Fondo fluido WebGL: `riosdigitali-create/Aqua`, `index.html`, blob `e3f3e8cfdf55d6b9639da3c0d4e9285b371cd346`. Se reutiliza el shader, colores y ciclo de animación. Se conserva fallback CSS y movimiento reducido.

## Comportamiento

- Cinco áreas de atención, clasificación original por reglas y orientación ilustrativa.
- Asistente con respuestas programadas, sin IA ni consulta de legislación en tiempo real.
- Solicitud de cita por WhatsApp, pendiente de confirmación; recordatorio Google Calendar con zona America/Mexico_City.
- No conecta la agenda privada de GM ni reutiliza la ubicación de GM. No registra automáticamente citas ni genera enlaces Meet.
- Todos los contactos de WhatsApp apuntan a `https://wa.me/528115191418`.
- Sitio estático; los textos del caso permanecen en el navegador hasta que el visitante decide abrir WhatsApp. No hay base de datos ni almacenamiento de casos.

## Validación

Pruebas de clasificación en cinco áreas, diagnóstico y resultado, chat, enlaces WhatsApp, fechas de Google Calendar, campos inválidos, fechas pasadas, archivos y anclas. La infraestructura de revisión visual en navegador no está disponible en esta sesión.

## Uso y publicación

El sitio está listo en la raíz: `index.html` y `assets/`. Para verlo localmente: `python3 -m http.server 8080` y abrir `http://localhost:8080`.

Para Cloudflare Pages, conectar este repositorio, elegir la rama `main`, framework «None», sin comando de compilación y directorio de salida `.`. El alojamiento de la demo debe configurarse por separado.

No requiere claves, dependencias de compilación ni variables de entorno.

## Rediseño editorial (07/10/2026)

Tipografía de sistema con estilo SF Pro/Helvetica, nueva jerarquía y navegación, portada con fotografía conceptual de balanza metálica, imagen arquitectónica conceptual, cinco fotografías para especialidades, galería horizontal y método interactivo de cuatro etapas con controles de teclado. Movimiento de scroll nativo y alternativas para movimiento reducido.

Imágenes conceptuales creadas con la herramienta nativa de generación de imágenes: balanza de acero pulido con reflejos azules, iluminación de estudio y sin texto; interior arquitectónico en travertino con escalera curva, luz natural y sin personas o textos. Integradas como `dist/assets/juris-balance.webp` y `dist/assets/juris-architecture.webp`.

Fotografías de apoyo: Unsplash, IDs `photo-1511895426328-dc8714191300`, `photo-1497366754035-f200968a6e72`, `photo-1450101499163-c8848c66ca85`, `photo-1521587760476-6c12a4b040da` y `photo-1486406146926-c627a92ad1ab`. Son imágenes editoriales, no personal ni oficinas de Juris.

Validación adicional: método y selección de sus cuatro etapas, navegación mediante teclado, botones del carrusel, precarga de ejemplos desde las cinco especialidades y estructura HTML. Las fotografías se inspeccionaron visualmente. La revisión visual de la página en navegador sigue pendiente por falta de esa infraestructura.
