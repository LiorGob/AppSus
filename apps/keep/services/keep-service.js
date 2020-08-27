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
        type: 'noteText',
        isPinned: false,
        info: {
            txt: 'sprint 3 is on'
        },
        style: {
            backgroundColor: getRandomColor()
        }
    },

    {
        id: makeId(),
        type: 'noteText',
        isPinned: false,
        info: {
            txt: 'sign on a contract for the apartment'
        },
        style: {
            backgroundColor: getRandomColor()
        }
    }

]


function query() {
    return Promise.resolve(notes)
}


class TextNote {
    constructor(type, txt) {
        this.id = makeId();
        this.type = type;
        this.isPinned = false;
        this.info = { txt: txt };
        this.style = { backgroundColor: getRandomColor() }
    }
}

function addNote(type, info) {
    let newNote = {};
    newNote = new TextNote(type, info);
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
    let currNote = JSON.parse(JSON.stringify(note))
    currNote.isPinned = !currNote.isPinned;
    notes = notes.map(note => currNote.id === note.id ? currNote : note);
    storageService.storageService('notes', notes);
    // eventBus.emit('noteChange')

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