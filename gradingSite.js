if (typeof(Storage) !== "undefined") {
    if (!localStorage.getItem("notenListe")) {
        localStorage.setItem("notenListe", JSON.stringify([1, 2, 3, 4, 5]));
    }
} else {
    console.log("Der Local Storage wird von deinem Webbrowser nicht unterstützt. Das Programm kann nicht ausgeführt werden.");
}

function addNoteToList(note) {
    let notenListe = JSON.parse(localStorage.getItem("notenListe"));
    notenListe.push(note);
    localStorage.setItem("notenListe", JSON.stringify(notenListe));
    updateNoteList();
}

function resetLastClick() {
    let notenListe = JSON.parse(localStorage.getItem("notenListe"));
    if (notenListe && notenListe.length > 5) {
        notenListe.pop();
        localStorage.setItem("notenListe", JSON.stringify(notenListe));
        updateNoteList();
    } else {
        alert("Es gibt keine Einträge, die zurückgesetzt werden können.");
    }
}


function deleteNoteList() {
    let notenListe = JSON.parse(localStorage.getItem("notenListe"));
    notenListe.splice(5);
    localStorage.setItem("notenListe", JSON.stringify(notenListe));
    updateNoteList();
}

function updateNoteList() {
    let notenListe = JSON.parse(localStorage.getItem("notenListe"));
    let noteListContainer = document.getElementById("note-list-container");
    noteListContainer.setHTML = "";

    if (notenListe) {
        let noteCount = {};

        for (let i = 0; i < notenListe.length; i++) {
            let note = notenListe[i];
            if (noteCount[note]) {
                noteCount[note]++;
            } else {
                noteCount[note] = 1;
            }
        }

        for (let note in noteCount) {
            let noteItem = document.createElement("li");
            let probability = (noteCount[note] / notenListe.length) * 100;
            noteItem.textContent = "Note " + note + " - Häufigkeit: " + noteCount[note] + ", Wahrscheinlichkeit: " + probability.toFixed(2) + "%";
            noteListContainer.appendChild(noteItem);
        }
    }
}

function showRandomNote() {
    let notenListe = JSON.parse(localStorage.getItem("notenListe"));
    if (notenListe && notenListe.length > 0) {
        let randomNote = notenListe[Math.floor(Math.random() * notenListe.length)];
        alert("Zufällige Note: " + randomNote);
    } else {
        alert("Die Notenliste ist leer. Füge zuerst eine Note hinzu.");
    }
}

function createButtonsAndNoteList() {
    let buttonContainer = document.getElementById("button-container");

    let noteListContainer = document.getElementById("note-list-container");

    // Erstellen der Buttons
    for (let i = 1; i <= 5; i++) {
        let button = document.createElement("button");
        button.textContent = "Note " + i;
        button.addEventListener("click", function() {
            addNoteToList(i);
        });
        buttonContainer.appendChild(button);
    }

    let randomButton = document.createElement("button");
    randomButton.textContent = "Zufällige Note anzeigen";
    randomButton.addEventListener("click", showRandomNote);
    buttonContainer.appendChild(randomButton);

    let resetLastClickButton = document.createElement("button");
    resetLastClickButton.textContent = "Letzten Klick zurücksetzen";
    resetLastClickButton.addEventListener("click", resetLastClick);
    buttonContainer.appendChild(resetLastClickButton);


    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Notenliste löschen";
    deleteButton.addEventListener("click", deleteNoteList);
    buttonContainer.appendChild(deleteButton);

    // Anzeigen der Notenliste
    updateNoteList();
}

// Programm starten
createButtonsAndNoteList();
