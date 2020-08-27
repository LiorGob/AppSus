import { DynamicNote } from './DynamicNote.jsx'
// import{keepService} from '../services/keep-service'
export function NoteList({ notes, onRemoveNote, onPinnedNote }) {
    return (
        <ul className="note-grid">
            {notes.map(note =>
                <li className="note" key={note.id} style={{ backgroundColor: note.style.backgroundColor }}>
                    <div onClick={() => onPinnedNote(note)}>{note.isPinned ?  <i className="fas fa-thumbtack"></i>:<i className="fas fa-unlink"></i> }</div>
                    <DynamicNote note={note} />
                    <div onClick={() => onRemoveNote(note.id)}><i className="far fa-trash-alt"></i></div>
                </li>)}
        </ul>

    )

}

