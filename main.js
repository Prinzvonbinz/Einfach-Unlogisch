const app = document.getElementById("app");

function showMainMenu(fake = false) {
  document.body.style.backgroundColor = "black";
  app.innerHTML = `
    <h1>Einfach Unlogisch</h1>
    <button onclick="startGame()">Start</button>
    <button onclick="exitGame()">Spiel beenden</button>
  `;
  app.dataset.fake = fake ? "true" : "false";
}

function exitGame() {
  if (app.dataset.fake === "true") {
    app.innerHTML = `
      <p>Bist du dir sicher?</p>
      <button onclick="showMainMenu(true)">Nein</button>
      <button onclick="trigger404(() => setTimeout(showRating, 10000))">Ja</button>
    `;
  } else {
    app.innerHTML = `<div class="big-text">NÖ</div>`;
    setTimeout(() => showMainMenu(), 2000);
  }
}

function startGame() {
  if (app.dataset.fake === "true") {
    app.innerHTML = `<div class="big-text">NÖ</div>`;
    setTimeout(() => {
      showMainMenu(true); // ✅ zurück zum Fake-Hauptmenü
    }, 2000);
    return;
  }
  // echter Start
  app.innerHTML = `
    <p>Bist du dir sicher, dass du dieses Spiel spielen möchtest?<br>Es wird hier rein garnichts passieren.</p>
    <button onclick="trigger404(() => setTimeout(() => showMainMenu(true), 10000))">Weiter</button>
  `;
}

  app.innerHTML = `
    <p>Bist du dir sicher, dass du dieses Spiel spielen möchtest?<br>Es wird hier rein garnichts passieren.</p>
    <button onclick="trigger404(() => setTimeout(() => showMainMenu(true), 10000))">Weiter</button>
  `;

function trigger404(callback) {
  document.body.style.backgroundColor = "white";
  app.innerHTML = `
    <h1 style="color:black;">Error 404 - Seite nicht gefunden</h1>
    <p style="color:black; max-width: 500px; margin: auto;">
      Die von Ihnen angeforderte Seite konnte nicht gefunden werden. 
      Möglicherweise haben Sie einen veralteten Link verwendet oder sich vertippt. 
      Kehren Sie zur Startseite zurück oder versuchen Sie es später erneut.
    </p>
  `;
  setTimeout(() => {
    document.body.style.backgroundColor = "black";
    app.innerHTML = "";
    if (typeof callback === "function") callback();
  }, 10000);
}

function showRating() {
  app.innerHTML = `
    <h2>Wie findest du das Spiel?</h2>
    <div class="stars">
      ${[1, 2, 3, 4, 5].map(i => `<span class="star" data-star="${i}">&#9733;</span>`).join('')}
    </div>
    <div id="rating-response"></div>
    <button onclick="submitRating()">Senden</button>
  `;

  document.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', () => {
      const value = parseInt(star.dataset.star);
      document.querySelectorAll('.star').forEach(s => {
        s.classList.remove('selected');
        if (parseInt(s.dataset.star) <= value) s.classList.add('selected');
      });
    });
  });
}

function submitRating() {
  const selected = document.querySelectorAll('.star.selected').length;
  const response = document.getElementById("rating-response");

  if (selected < 5) {
    response.innerText = "Falsch.";
  } else {
    showFinalCountdown();
  }
}

function showFinalCountdown() {
  let time = 5;
  const interval = setInterval(() => {
    app.innerHTML = `<h2>Countdown: ${time}</h2>`;
    time--;
    if (time < -20) {
      clearInterval(interval);
      app.innerHTML = `
        <h1>Teile das Spiel mit deinen Freunden ❤️</h1>
        <p>Coming Soon<br><strong>Teil 2 (vielleicht)</strong></p>
      `;
    }
  }, 1000);
}

// Start beim Laden
showMainMenu();
