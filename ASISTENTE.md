# CrewVital · Asistente Kibo (IA con Gemini)

Kibo es el marciano en su ovni que aparece abajo a la derecha en el rol de
tripulante. Conversa con el tripulante y responde dudas de salud usando solo la
información de la NASA que ya trae la plataforma y las mediciones de ese tripulante.

## Cómo está armado

```
App (GitHub Pages)  →  Servidor intermedio (Cloudflare Worker)  →  Gemini (Google)
   sin clave              guarda la clave en secreto
```

La clave de Gemini **no va en el repositorio**. Se guarda en un Cloudflare Worker
gratuito; en `config.js` solo va la dirección de ese Worker, que no es secreta.

## Qué hace Kibo

- **Responde con la base de la plataforma.** En cada pregunta se envía a Gemini el
  contenido de `data.js` (peligros HRP, zonas del cuerpo, los 10 indicadores con
  sus rangos y acciones, evidencia NASA, escenarios y protocolos de emergencia) y
  las últimas mediciones del tripulante. Tiene la instrucción de no usar ningún otro
  conocimiento y de decirlo cuando algo no está en esa base.
- **Conversa.** Escucha, pregunta por sueño, ánimo, estrés y convivencia, y ante
  señales de riesgo indica hablar con el oficial médico y pulsar EMERGENCIA.
- **Lleva un registro de bienestar.** Al cerrar el chat (o al pulsar ↻ para empezar
  una conversación nueva) guarda un resumen breve, un nivel de ánimo de 1 a 5 y
  etiquetas (estrés, sueño, aislamiento, ánimo bajo, ansiedad, conflicto, riesgo).
  **No se guarda el texto de la conversación.**
- **Quién ve el registro.** El tripulante, en la pestaña "Mi registro" del chat; el
  médico, en su pantalla principal, recuadro "Bienestar emocional · registros de
  Kibo". Si la sincronización está activa, se comparte entre dispositivos.

## Paso 1 · Clave de Gemini

1. Entra a <https://aistudio.google.com/apikey>.
2. Si ya tenías una clave que apareció en capturas o estuvo a punto de subirse a
   GitHub, bórrala (**Borrar clave**) y crea una nueva con **Crear clave de API**.
3. Copia la clave con el botón **Copiar clave**. No la pegues en ningún archivo
   del repositorio; solo se usará en el Paso 3.

## Paso 2 · Crear el Worker en Cloudflare

Los nombres de los botones pueden variar un poco según la versión del panel.

1. Crea una cuenta gratuita en <https://dash.cloudflare.com/sign-up> y confirma tu correo.
2. En el menú de la izquierda entra a **Workers & Pages** (puede estar dentro de
   **Compute**).
3. Pulsa **Create** (Crear) → **Create Worker** / **Start with Hello World**.
4. Ponle de nombre `crewvital-kibo` y pulsa **Deploy**.
5. Pulsa **Edit code** (Editar código).
6. Borra todo el código de ejemplo, abre el archivo `cloudflare/worker.js` de esta
   carpeta, copia todo su contenido y pégalo.
7. Pulsa **Deploy** (arriba a la derecha).

## Paso 3 · Guardar la clave y los sitios permitidos

1. Sal del editor y entra a tu Worker → **Settings** (Configuración) →
   **Variables and Secrets** (Variables y secretos) → **Add** (Agregar).
2. Agrega la clave:
   - Type (Tipo): **Secret**
   - Name (Nombre): `GEMINI_API_KEY`
   - Value (Valor): pega la clave de Gemini.
3. Agrega los sitios que pueden usar a Kibo:
   - Type (Tipo): **Text**
   - Name (Nombre): `ALLOWED_ORIGINS`
   - Value (Valor): la dirección de tu sitio **sin la carpeta del repositorio y sin
     barra al final**. Para varios, sepáralos con coma. Ejemplo:

     ```
     https://robertomq16.github.io,http://127.0.0.1:5500
     ```

     (el segundo es para probar con Live Server; puedes omitirlo).
4. Pulsa **Deploy** / **Save and deploy** para aplicar.

## Paso 4 · Conectar la app

1. En la página de tu Worker copia su dirección. Se ve así:
   `https://crewvital-kibo.tu-usuario.workers.dev`
2. Compruébala abriéndola en el navegador: debe mostrar
   "CrewVital Kibo: servidor intermedio activo."
3. Abre `config.js` y pégala en `endpoint`:

```js
window.CREWVITAL_AI = {
  endpoint: 'https://crewvital-kibo.tu-usuario.workers.dev',
  model: 'gemini-flash-latest'
};
```

4. Sube los cambios a GitHub (esta vez no aparecerá el aviso de "Secret scanning")
   y recarga la app dos veces.
5. Entra como tripulante, abre a Kibo y pulsa una de las preguntas sugeridas.

`model`: `gemini-flash-latest` usa siempre el Gemini Flash más reciente. Si
prefieres fijar una versión, escribe su nombre exacto (por ejemplo
`gemini-2.5-flash`); la lista vigente está en Google AI Studio.

## Cosas que conviene saber

- **Qué protege el Worker.** La clave nunca llega al navegador ni al repositorio.
  El Worker solo acepta peticiones que vengan de los sitios de `ALLOWED_ORIGINS`,
  solo hacia modelos Gemini y solo para generar respuestas. Alguien con
  conocimientos técnicos podría imitar tu sitio y gastar cuota, pero no puede
  obtener la clave.
- **No actives la facturación en el proyecto de Google** si no la necesitas: sin
  ella, lo peor que puede pasar es agotar la cuota gratuita del día.
- **Necesita internet.** Sin conexión, el resto de la app funciona pero Kibo no responde.
- **Límites gratuitos.** Gemini tiene un tope de preguntas por minuto y por día;
  Cloudflare permite 100 000 peticiones diarias en el plan gratuito.
- **Privacidad.** Lo que el tripulante escribe y sus mediciones se envían a Google
  (pasando por Cloudflare) para generar la respuesta. En el plan gratuito, Google
  puede usar esos datos para mejorar sus modelos. Es adecuado para demostraciones y
  datos de prueba, no para datos médicos reales de personas.
- **Es una IA.** Puede equivocarse o salirse alguna vez de la base de la
  plataforma. El nivel de ánimo es una estimación para orientar al médico, no un
  diagnóstico.
- **El registro se guarda al cerrar el chat.** Si se cierra el navegador sin cerrar
  el chat, esa conversación puede quedar sin resumen.

## Si algo falla

Kibo muestra el mensaje de error en letra pequeña dentro del chat.

- **"El asistente aún no está activado":** falta `endpoint` en `config.js` o no se
  ha recargado la app.
- **"Origen no permitido":** la dirección desde la que abres la app no está en
  `ALLOWED_ORIGINS`. Debe ser solo `https://usuario.github.io`, sin la carpeta.
- **"Falta configurar GEMINI_API_KEY":** el secreto no está guardado o falta
  volver a desplegar el Worker.
- **"API key not valid" o "permission denied":** la clave está mal copiada o la
  cuenta con la que se creó tiene restringida la API; créala con una cuenta personal.
- **"not found" con el nombre del modelo:** cambia `model` por un modelo vigente.
- **"quota" o 429:** se alcanzó el límite gratuito; espera un minuto.
- **"Failed to fetch":** la dirección del Worker en `endpoint` está mal escrita o
  no hay conexión.
