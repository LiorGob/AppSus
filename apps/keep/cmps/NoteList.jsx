import { DynamicNote } from './DynamicNote.jsx'
// import{keepService} from '../services/keep-service'
export function NoteList({ notes, onRemoveNote, onPinnedNote }) {
    return (
        <ul className="note-grid">
            {notes.map(note =>
                <li className="note" key={note.id} style={{ backgroundColor: note.style.backgroundColor }}>
                    <button onClick={() => onPinnedNote(note)} >{note.isPinned ?  <i className="fas fa-thumbtack"></i>:<i className="fas fa-unlink"></i> } </button>
                    <DynamicNote note={note} />
                    <button onClick={() => onRemoveNote(note.id)}><i className="far fa-trash-alt"></i></button>
                </li>)}
        </ul>

    )

}

