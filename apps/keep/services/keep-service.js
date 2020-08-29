import { storageService } from '../../../services/storage-service.js';
import { eventBus } from '../../../services/event-bus-service.js'

const KEY_NOTES = 'notes'

export const keepService = {
    query,
    addNote,
    // getNotes,
    getNoteById,
    removeNote,
    setPinNote,
    // save,
    // getEmpty
}


var notes = [
    {
        id: makeId(),
        type: 'NoteTxt',
        isPinned: false,
        info: {
            txt: 'sprint 3 is on'
        },
        style: {
            backgroundColor: '#c44751'
        }
    },

    {
        id: makeId(),
        type: 'NoteTxt',
        isPinned: false,
        info: {
            txt: 'sign on a contract for the apartment'
        },
        style: {
            backgroundColor: '#6d70a7'
        }
    },
    {
        id: makeId(),
        type: 'NoteImg',
        isPinned: false,
        info: {
            url: 'apps/keep/assets/img/view-img.jpg',
            title: 'beatiful view'
        },
        style: {
            backgroundColor: '#ee9460'
        }
    },
    {
        id: makeId(),
        type: 'NoteImg',
        isPinned: false,
        info: {
            url: 'apps/keep/assets/img/kiss-img.gif',
            title: 'kiss'
        },
        style: {
            backgroundColor: '#66282f'
        }
    },
    {
        id: makeId(),
        type: 'NoteImg',
        isPinned: false,
        info: {
            url: 'apps/keep/assets/img/cat.gif',
            title: 'smart cat'
        },
        style: {
            backgroundColor: '#fce181'
        }
    },
    {
        id: makeId(),
        type: 'NoteTodos',
        isPinned: false,
        info: {
            label: 'How was it:',
            todos: [
                { txt: 'buy Rosie Project book', doneAt: new Date().toLocaleString() },
                { txt: 'pay for the test of the car', doneAt: new Date().toLocaleString() }
            ]
        },
        style: {
            backgroundColor: '#9fedd7'
        }
    },
    {
        id: makeId(),
        type: 'NoteTodos',
        isPinned: false,
        info: {
            label: 'How was it:',
            todos: [
                { txt: 'open linkedin', doneAt: new Date().toLocaleString() },
                { txt: 'sent email to my sister', doneAt: new Date().toLocaleString() }
            ]
        },
        style: {
            backgroundColor: '#95c781'
        }
    },
    {
        id: makeId(),
        type: 'NoteVideo',
        isPinned: false,
        info: {
            url: 'https://www.youtube.com/embed/watch?v=WyDloWawVWo',
            title: 'nice music'
        },
        style: {
            backgroundColor: '#deb887'
        }
    }
  

]

// function getEmpty() {
//     return {id: makeId(),  type:'', isPinned: false, info:'',style: { backgroundColor: getRandomColor() } };
// }

function query() {
    notes = storageService.loadFromStorage(KEY_NOTES) || notes
    storageService.saveToStorage(KEY_NOTES, notes)
    return Promise.resolve(notes)
}


function createTxtNote(type, info) {
    return {
        id: makeId(),
        type: type,
        isPinned: false,
        info: { txt: info },
        style: { backgroundColor: getRandomColor() }
    }
}

function createImgNote(type, info) {
    return {
        id: makeId(),
        type: type,
        isPinned: false,
        info: { url: info, title: 'new picture' },
        style: { backgroundColor: getRandomColor() }
    }
}

function createTodoNote(type, info) {
    return {
        id: makeId(),
        type: type,
        isPinned: false,
        info: { label: '', todos: [{ txt: info, doneAt: new Date().toLocaleString() }, { txt: info, doneAt: new Date().toLocaleString() }] },
        style: { backgroundColor: getRandomColor() }
    }

}

function createVidoNote(type, info) {
    return {
        id: makeId(),
        type: type,
        isPinned: false,
        info: { url: info, title: 'video to keep' },
        style: { backgroundColor: getRandomColor() }
    }
}



// switch case with note depand on the info and type
function addingNote(type, info) {
    let note = {}
    switch (type) {
        case 'NoteTxt':
            return createTxtNote(type, info);
        case 'NoteImg':
            return createImgNote(type, info);
        case 'NoteTodos':
            return createTodoNote(type, info);
        case 'NoteVideo':
            return createVidoNote(type, info);
        default:
            break;
    }
    return note
}


function addNote( type, info) {
   let newNote = addingNote(type, info);
    notes = [newNote, ...notes];
    storageService.saveToStorage(KEY_NOTES, notes)
    return Promise.resolve(notes)
}




// function save(noteToSave) {
//     noteToSave.id ? _update(noteToSave) : addNote(noteToSave)
// }

// function _update(noteToSave) {
//     notes = notes.map(note => note.id === noteToSave.id ? noteToSave : note)
//     return noteToSave
// }


// function addNote(newNote) {
//     newNote = addingNote(type, info);
//     notes = [newNote, ...notes];
//     storageService.saveToStorage(KEY_NOTES, notes)
//     return Promise.resolve(notes)
// }



// function getNotes() {
//     if (storageService.loadFromStorage(KEY_NOTES)) {
//         notes = storageService.loadFromStorage(KEY_NOTES)
//     } else {
//         storageService.saveToStorage(KEY_NOTES, notes)
//     }
//     return Promise.resolve([...notes])
// }

function removeNote(noteId) {
    notes = notes.filter(note => note.id !== noteId);
    storageService.saveToStorage(KEY_NOTES, notes)
    return Promise.resolve(notes)
}


function setPinNote(note) {
    note.isPinned = !note.isPinned;
    if (note.isPinned === true) {
        notes.sort(function (x, y) {
            return (x === y) ? 0 : x ? -1 : 1
        })
    }
    storageService.saveToStorage(KEY_NOTES, notes);
    return Promise.resolve(notes)
}

function getNoteById(noteId) {
    const note = notes.find(note => note.id === noteId);
    return Promise.resolve(note);
}


function makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

