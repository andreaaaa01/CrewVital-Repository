# CrewVital · Sincronización en tiempo real

Con la sincronización activada, lo que se registra en un dispositivo aparece al
instante en todos los demás dispositivos que abran la plataforma. Usa una base de
datos gratuita de Firebase (Realtime Database). Solo hay que configurarla una vez.

## Qué se comparte y qué no

| Se comparte entre dispositivos | Se queda en cada dispositivo |
| --- | --- |
| Mediciones (tripulante y médico) | Rol elegido (tripulante / médico) |
| Tripulación: nombres, altas y bajas | Tripulante activo y bloqueo de tripulante |
| Fecha de inicio y entorno de misión | Idioma y apariencia |
| Informe de situación y pasos del médico | Informe PDF importado en "Seguimiento a distancia" |
| "Nueva misión / Limpiar datos" (borra en todos) | |

Sin conexión la app sigue funcionando: los cambios se guardan en el dispositivo y
se envían solos al recuperar la conexión.

## Paso 1 · Crear la base de datos (una sola vez, gratis)

1. Entra a <https://console.firebase.google.com> con una cuenta de Google.
2. **Agregar proyecto** → ponle un nombre (por ejemplo `crewvital`) → Crear.
   Google Analytics no hace falta; puedes desactivarlo.
3. En el menú de la izquierda: **Compilación → Realtime Database → Crear base de datos**.
4. Elige la ubicación que prefieras y selecciona **modo bloqueado**.
5. Copia la dirección que aparece arriba de los datos. Se ve así:
   `https://crewvital-xxxxx-default-rtdb.firebaseio.com`

## Paso 2 · Permitir el acceso de la app

En la pestaña **Reglas** de Realtime Database, reemplaza todo por esto y pulsa **Publicar**:

```json
{
  "rules": {
    "crewvital": {
      "$mision": {
        ".read": true,
        ".write": true
      }
    }
  }
}
```

## Paso 3 · Conectar la app

Abre el archivo `config.js` de esta carpeta y pega tu dirección:

```js
window.CREWVITAL_SYNC = {
  databaseURL: 'https://crewvital-xxxxx-default-rtdb.firebaseio.com',
  mission: 'mision-1'
};
```

Sube la carpeta a tu hosting como siempre. Todos los dispositivos que abran la
plataforma quedarán conectados entre sí.

- `mission` es el código de la misión. Dispositivos con el mismo código comparten
  datos. Si quieres separar grupos, publica copias con códigos distintos. Usa solo
  letras, números, guion y guion bajo.
- Si dejas `databaseURL` vacío (`''`), la app funciona como antes: solo local.

## Cómo saber si funciona

- Junto al día de misión aparece un indicador: **En línea** (verde), **Conectando**
  o **Sin conexión** (amarillo), **Acceso denegado** (rojo; revisa el Paso 2).
- En **Ajustes → Sincronización en tiempo real** se ve el estado, el código de
  misión y cuántos cambios faltan por enviar.
- Prueba rápida: abre la plataforma en dos dispositivos, guarda una medición en
  uno y mira el panel de Tripulación en el otro.

La primera vez que un dispositivo se conecta, las mediciones que ya tenía
guardadas se suben y se combinan con las de los demás.

## Importante sobre la privacidad

Con las reglas del Paso 2, cualquier persona que conozca la dirección de la base
de datos y el código de misión puede leer y modificar los datos. La dirección va
dentro de `config.js`, que es público en tu sitio. Es adecuado para demostraciones,
simulacros y datos de prueba. Para datos médicos reales de personas hay que añadir
inicio de sesión (Firebase Authentication) y reglas que lo exijan.

## Si algo falla

- **Acceso denegado:** las reglas no están publicadas o la ruta no es `crewvital`.
- **Se queda en "Conectando":** revisa que `databaseURL` sea exactamente la del
  Paso 1, empiece por `https://` y no termine en `/`.
- **No cambia nada tras editar `config.js`:** cierra y vuelve a abrir la app (o
  recarga dos veces) para que se actualice la copia guardada sin conexión.
