document.addEventListener("DOMContentLoaded", function () {
  // Liste de mots qui seront utilisés pour le test de frappe
  const wordBank = [
    ["pomme"],
    ["banane"],
    ["cerise"],
    ["orange"],
    ["raisin"],
    ["fraise"],
    ["poire"],
    ["kiwi"],
    ["mangue"],
    ["ananas"],
    ["voiture"],
    ["moto"],
    ["vélo"],
    ["bus"],
    ["train"],
    ["avion"],
    ["bateau"],
    ["camion"],
    ["trottinette"],
    ["fusée"],
    ["maison"],
    ["appartement"],
    ["immeuble"],
    ["cabane"],
    ["château"],
    ["hôtel"],
    ["école"],
    ["hôpital"],
    ["bibliothèque"],
    ["musée"],
    ["chat"],
    ["chien"],
    ["lapin"],
    ["hamster"],
    ["cheval"],
    ["tigre"],
    ["lion"],
    ["éléphant"],
    ["girafe"],
    ["singe"],
    ["ordinateur"],
    ["téléphone"],
    ["tablette"],
    ["télévision"],
    ["radio"],
    ["imprimante"],
    ["clavier"],
    ["souris"],
    ["casque"],
    ["micro"],
  ];

  let generatedPhrase = ""; // Stocke la phrase générée
  let countdown = 0; // Compteur de temps
  let countdownInterval; // Intervalle du timer
  let playerScore = 5000; // Score du joueur
  let currentIndex = 0; // Index du caractère en cours dans la phrase
  let highScore = localStorage.getItem("highScore")
    ? parseInt(localStorage.getItem("highScore"))
    : 0; // Meilleur score enregistré

  // Si on est sur l'écran d'accueil
  if (document.getElementById("start")) {
    function generateRandomPhrase() {
      const phraseArray = [];
      for (let i = 0; i < 150; i++) {
        const randomIndex = Math.floor(Math.random() * wordBank.length);
        phraseArray.push(wordBank[randomIndex]);
      }
      generatedPhrase = phraseArray.flat().join(" ");
      localStorage.setItem("phrase", generatedPhrase); // Stocke la phrase pour la prochaine page
    }

    document
      .getElementById("start")
      .addEventListener("click", function (event) {
        event.preventDefault();
        const playerName = document
          .getElementById("tu connais")
          .elements["pseudo"].value.trim();
        localStorage.setItem("playerName", playerName);
        generateRandomPhrase(); // Génère une nouvelle phrase
        window.location.href = "game.html"; // Redirige vers la page du test
      });
  }

  function updateCountdown() {
    if (countdown >= 90) {
      clearInterval(countdownInterval);
      if (generatedPhrase.slice(currentIndex).length > 0) {
        // Calcul du score final
        playerScore = Math.round(
          (playerScore / 5000) *
            (generatedPhrase.slice(0, currentIndex).length /
              generatedPhrase.length) *
            5000
        );
        if (playerScore > highScore) {
          highScore = playerScore;
          localStorage.setItem("highScore", highScore);
        }
        document.getElementById("score").textContent =
          "Ton score : " + playerScore;
        document.getElementById("window").style.display = "block";
        document.getElementById("window").textContent =
          localStorage.getItem("playerName") +
          " ton score final est " +
          playerScore +
          " et ton meilleur score est " +
          highScore;
        document.getElementById("retry").style.display = "block";
      }
    }
    document.getElementById("count").textContent = countdown;
    countdown++;
  }

  // Si on est sur la page du test de frappe
  if (document.getElementById("contentr")) {
    document.getElementById("window").style.display = "none";
    document.getElementById("retry").style.display = "none";
    document.getElementById("retry").addEventListener("click", function () {
      location.reload();
    });
    generatedPhrase = localStorage.getItem("phrase") || ""; // Récupère la phrase générée
    document.getElementById("contentr").textContent = "|" + generatedPhrase;
    document.getElementById("name").textContent =
      "Bonne chance " + localStorage.getItem("playerName");

    countdownInterval = setInterval(updateCountdown, 1000);
    document.getElementById("score").textContent = "Ton score : " + playerScore;

    document.addEventListener("keydown", function (event) {
      const typedLetter = event.key;
      if (
        currentIndex < generatedPhrase.length &&
        generatedPhrase[currentIndex] === typedLetter
      ) {
        currentIndex++;
        document.getElementById("content").textContent =
          generatedPhrase.slice(0, currentIndex) + "|";
        document.getElementById("contentr").textContent =
          generatedPhrase.slice(currentIndex);
      } else if (
        currentIndex < generatedPhrase.length &&
        generatedPhrase[currentIndex] !== typedLetter
      ) {
        playerScore -= 100;
        document.getElementById("score").textContent =
          "Ton score : " + playerScore;
      }
    });
  }
});
