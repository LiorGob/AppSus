import { DynamicNote } from './DynamicNote.jsx'
// import{keepService} from '../services/keep-service'
export function NoteList({ notes, onRemoveNote, onPinnedNote }) {
    return (
        <ul className="note-grid">
            {notes.map(note =>
                <li className="note" key={note.id} style={{ backgroundColor: note.style.backgroundColor }}>
                    <DynamicNote note={note} />
                    <button onClick={() => onRemoveNote(note.id)}>X</button>
                    <button onClick={() => onPinnedNote(note)}>{note.isPinned ? 'unpin' : 'pin'}</button>
                </li>)}
        </ul>

    )

}

