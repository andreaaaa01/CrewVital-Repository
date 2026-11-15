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
