# CrewVital · Asistente Kibo (IA con Gemini)

Kibo es el marciano en su ovni que aparece abajo a la derecha en el rol de
tripulante. Conversa con el tripulante y responde dudas de salud usando solo la
información de la NASA que ya trae la plataforma y las mediciones de ese tripulante.

## Qué hace

- **Responde con la base de la plataforma.** En cada pregunta se le envía a Gemini
  el contenido de `data.js` (peligros HRP, zonas del cuerpo, los 10 indicadores con
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

## Paso 1 · Obtener la clave de Gemini (gratis)

1. Entra a <https://aistudio.google.com/apikey> con una cuenta de Google.
2. Pulsa **Crear clave de API** (Create API key) y elige o crea un proyecto.
3. Copia la clave (empieza por `AIza...`).

## Paso 2 · Ponerla en la app

Abre `config.js` y pega la clave:

```js
window.CREWVITAL_AI = {
  apiKey: 'AIza................................',
  model: 'gemini-flash-latest'
};
```

- `model`: `gemini-flash-latest` usa siempre el Gemini Flash más reciente. Si
  prefieres fijar una versión, escribe su nombre exacto (por ejemplo
  `gemini-2.5-flash`); la lista vigente está en Google AI Studio.
- Con `apiKey` vacío, Kibo se muestra pero avisa que no está activado.

Sube los cambios y recarga la app dos veces.

## Paso 3 · Restringir la clave (importante)

La clave queda visible en `config.js` para cualquiera que abra el sitio. Para que
nadie más pueda usarla desde otra página:

1. Entra a <https://console.cloud.google.com/apis/credentials> y elige el mismo
   proyecto de la clave.
2. Abre la clave y en **Restricciones de aplicación** elige **Sitios web**.
3. Agrega tu dirección, por ejemplo `https://tu-usuario.github.io/*`
   (y `http://127.0.0.1:5500/*` si la pruebas con Live Server).
4. En **Restricciones de API** elige **Restringir clave** y marca solo
   **Generative Language API**.
5. Guarda. Puede tardar unos minutos en aplicarse.

## Cosas que conviene saber

- **Necesita internet.** Sin conexión, el resto de la app funciona pero Kibo no responde.
- **Límites gratuitos.** El plan gratuito de Gemini tiene un tope de preguntas por
  minuto y por día. Si se alcanza, Kibo muestra un aviso de error; se resuelve
  esperando o activando la facturación en Google.
- **Privacidad.** Lo que el tripulante escribe y sus mediciones se envían a Google
  para generar la respuesta. En el plan gratuito, Google puede usar esos datos para
  mejorar sus modelos. Es adecuado para demostraciones y datos de prueba, no para
  datos médicos reales de personas.
- **Es una IA.** Puede equivocarse. El nivel de ánimo es una estimación para
  orientar al médico, no un diagnóstico. El aviso al tripulante aparece al inicio
  de cada conversación.
- **El registro se guarda al cerrar el chat.** Si se cierra el navegador sin cerrar
  el chat, esa conversación puede quedar sin resumen.

## Si algo falla

- **"El asistente aún no está activado":** falta `apiKey` en `config.js` o no se ha
  recargado la app.
- **Error con "API key not valid":** la clave está mal copiada.
- **Error con "referer" o "blocked":** la restricción de sitios web no incluye la
  dirección desde la que abres la app.
- **Error con "not found" y el nombre del modelo:** cambia `model` por un modelo
  vigente de la lista de Google AI Studio.
- **Error con "quota" o 429:** se alcanzó el límite gratuito; espera un minuto.
