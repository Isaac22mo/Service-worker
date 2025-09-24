self.addEventListener("install", (event) => {
  logPhase("Instalando");

  event.waitUntil(
    new Promise((resolve) => {
      setTimeout(() => {
        logPhase("Instalado / Esperando");
        resolve();
      }, 1000);
    })
  );
});

self.addEventListener("activate", (event) => {
  logPhase("Activación");

  event.waitUntil(
    new Promise((resolve) => {
      setTimeout(() => {
        logPhase("Activado");
        resolve();
      }, 1000);
    })
  );

  setTimeout(() => {
    logPhase("Ocioso");
  }, 4000);
});

function logPhase(message) {
  const now = new Date();
  const fecha = now.toLocaleDateString("es-MX");
  const hora = now.toLocaleTimeString("es-MX");

  const log = { mensaje: message, fecha: fecha, hora: hora };

  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage(log);
    });
  });
}
