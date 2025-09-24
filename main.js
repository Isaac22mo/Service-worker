if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./service-worker.js").then((registration) => {
    console.log("✅ Service Worker registrado");

    // Esperamos a que el Service Worker se active
    registration.onupdatefound = () => {
      const installingWorker = registration.installing;
      installingWorker.onstatechange = () => {
        if (installingWorker.state === 'activated') {
          // Enviar un mensaje al Service Worker cuando esté activo
          navigator.serviceWorker.controller.postMessage("listo");
        }
      };
    };
  });

  navigator.serviceWorker.addEventListener("message", (event) => {
    const log = event.data;
    if (log) {
      addLogToScreen(log.mensaje, log.fecha, log.hora);
      saveLogLocal(log);
    }
  });
}

function saveLogLocal(log) {
  let logs = JSON.parse(localStorage.getItem("bitacora")) || [];
  logs.push(log);
  localStorage.setItem("bitacora", JSON.stringify(logs));
}

window.addEventListener("load", () => {
  const logs = JSON.parse(localStorage.getItem("bitacora")) || [];
  logs.forEach((l) => {
    addLogToScreen(l.mensaje, l.fecha, l.hora);
  });
});

function addLogToScreen(mensaje, fecha, hora) {
  const tbody = document.querySelector("#bitacora tbody");
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${mensaje}</td>
    <td>${fecha}</td>
    <td>${hora}</td>
    <td>✅</td>
  `;

  tbody.appendChild(row);
}