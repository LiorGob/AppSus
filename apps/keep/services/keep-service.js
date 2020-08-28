import { storageService } from '../../../services/storage-service.js';
import { eventBus } from '../../../services/event-bus-service.js'

export const keepService = {
    query,
    addNote,
    getNotes,
    getNoteById,
    removeNote,
    setPinNote
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
        info: {
            url: 'apps/keep/assets/img/view-img.jpg',
            title: 'beatiful-view'
        },
        style: {
            backgroundColor: '#ee9460'
        }
    },
    {
        id: makeId(),
        type: 'NoteImg',
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
        type: 'NoteTodos',
        info: {
            label: 'How was it:',
            todos: [
                { txt: 'Do that', doneAt: new Date().toLocaleString() },
                { txt: 'Do this', doneAt: new Date().toLocaleString() }
            ]
        },
        style: {
            backgroundColor: '#9fedd7'
        }
    }

]


function query() {
    return Promise.resolve(notes)
}


function createTxtNote(type, txt) {
    return {
        id: makeId(),
        type: type,
        isPinned: false,
        info: { txt: txt },
        style: { backgroundColor: getRandomColor() }
    }
}

function createImgNote(type, info) {
    return {
        id: makeId(),
        type: type,
        isPinned: false,
        info: { url: info, title: txt },
        style: { backgroundColor: getRandomColor() }
    }
}


// switch case with note depand on the info and type
function addNote(type, info) {
    let newNote = createTxtNote(type, info);
    notes = [newNote, ...notes];
    storageService.saveToStorage('notes', notes)
    return Promise.resolve(notes)
}


function getNotes() {
    if (storageService.loadFromStorage('notes')) {
        notes = storageService.loadFromStorage('notes')
    } else {
        storageService.saveToStorage('notes', notes)
    }
    return Promise.resolve([...notes])
}

function removeNote(noteId) {
    notes = notes.filter(note => note.id !== noteId);
}


function setPinNote(note) {
    note.isPinned = !note.isPinned;
    if (note.isPinned === true) {
        notes.sort(function (x, y) {
            return (x === y) ? 0 : x ? -1 : 1
        })
    }
    storageService.saveToStorage('notes', notes);
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



// toggleShowTxt =()=>{
//     this.setState({isLongTxtShown: !this.state.isLongTxtShown})
// }
