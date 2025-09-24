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
  event.waitUntil(self.clients.claim());
});

self.addEventListener("message", (event) => {
  if (event.data === "listo") {
    logPhase("Activado");
    setTimeout(() => {
      logPhase("Ocioso");
    }, 3000);
  }
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