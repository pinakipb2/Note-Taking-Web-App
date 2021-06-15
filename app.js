// Note Structure
function myNote(title, note, imp) {
    this.title = title;
    this.note = note;
    this.imp = imp;
}

// Display Notes
const showNotes = () => {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    var html = "";
    notesObj.forEach((element, index) => {
        if (element.imp == 0) {
            html += `
        <div id="${index}-card" class="noteCard my-2 mx-2 card" style="width: 19rem;">
                <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text">${element.note}</p>
                    <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-danger">Delete</button>
                    <button id="${index}-imp" onclick="markImp(this.id)" class="btn btn-warning">Mark Important</button>
                </div>
            </div>`;
        }
        else {
            html += `
        <div id="${index}-card" class="noteCard my-2 mx-2 card" style="width: 19rem; background:#f5daba">
                <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text">${element.note}</p>
                    <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-danger">Delete</button>
                    <button id="${index}-imp" onclick="markImp(this.id)" class="btn btn-warning">Mark Unimportant</button>
                </div>
            </div>`;
        }
    });
    let notesDom = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesDom.innerHTML = html;
    }
    else {
        notesDom.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
    }
};

// Show Note
showNotes();

// Add Note
const addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', (event) => {
    const addText = document.getElementById('addText');
    const addTitle = document.getElementById('addTitle');
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    if (addText.value != "" && addTitle.value != "") {
        const val = new myNote(addTitle.value, addText.value, 0);
        notesObj.push(val);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        addText.value = "";
        addTitle.value = "";
        // console.log(notesObj);
        showNotes();
    }
    else {
        swal("Blank Note!", "Note cannot be blank!", "error");
    }
});

// Delete Note
const deleteNote = (index) => {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    // console.log(notesObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
};

// Mark Important
const markImp = (index) => {
    index = index.replace("-imp", "");
    index = parseInt(index);
    // console.log(index);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj[index].imp ^= 1;
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
};

// Search Note
let search = document.getElementById('searchText');
search.addEventListener('input', () => {
    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach((element) => {
        let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        let cardTitle = element.getElementsByTagName("h5")[0].innerText.toLowerCase();
        // console.log(cardTitle);
        if (cardTxt.includes(inputVal) || cardTitle.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    });
});

// Reset Local Storage
const notesReset = document.getElementById('notesReset');
notesReset.addEventListener('click', () => {
    // console.log(localStorage);
    localStorage.clear();
    // console.log(localStorage);
    showNotes();
});