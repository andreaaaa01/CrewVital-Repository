/* CrewVital - configuracion de la sincronizacion en tiempo real.
   1) databaseURL: direccion de tu Firebase Realtime Database
      (ejemplo: 'https://mi-proyecto-default-rtdb.firebaseio.com').
      Dejala vacia ('') para usar la app solo en este dispositivo.
   2) mission: codigo de la mision. Todos los dispositivos que abran la
      plataforma con el mismo codigo comparten los mismos datos.
   Instrucciones paso a paso: SINCRONIZACION.md */
window.CREWVITAL_SYNC = {
  databaseURL: 'https://crewvital-c2bc1-default-rtdb.firebaseio.com',
  mission: 'mision-1'
};

/* Asistente Kibo (IA con Gemini).
   1) endpoint: direccion de tu servidor intermedio en Cloudflare
      (ejemplo: 'https://crewvital-kibo.tu-usuario.workers.dev'). La clave de Gemini
      se guarda alla, no en este archivo. Dejalo vacio ('') para mostrar a Kibo sin conversacion.
   2) model: modelo de Gemini. Usa un nombre de la lista que muestra <tu-worker>/test (modelos_flash).
   NO pegues aqui la clave de Gemini: este archivo es publico.
   Instrucciones paso a paso: ASISTENTE.md */
window.CREWVITAL_AI = {
  endpoint: 'https://crewvital-kibo.crewvitalproyectonasa.workers.dev',
  model: 'gemini-4-hydrogen'
};
