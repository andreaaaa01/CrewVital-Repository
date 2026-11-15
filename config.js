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
   1) apiKey: clave de la API de Gemini (se obtiene gratis en https://aistudio.google.com/apikey).
      Dejala vacia ('') para mostrar a Kibo sin conversacion.
   2) model: modelo de Gemini. 'gemini-flash-latest' usa siempre el Flash mas reciente.
   Instrucciones y como restringir la clave: ASISTENTE.md */
window.CREWVITAL_AI = {
  apiKey: '',
  model: 'gemini-flash-latest'
};
