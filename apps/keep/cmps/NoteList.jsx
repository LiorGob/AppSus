import { DynamicNote } from './DynamicNote.jsx'
// import{keepService} from '../services/keep-service'
export function NoteList({ notes, onRemoveNote, onPinnedNote, onUpdateNote }) {
    return (
        <ul className="note-grid">
            {notes.map(note =>
                <li className="note" key={note.id} style={{ backgroundColor: note.style.backgroundColor }}>
                    <button onClick={() => onPinnedNote(note.id)} >{note.isPinned ? <i className="fas fa-thumbtack"></i> : <i className="fas fa-unlink"></i>} </button>
                    <DynamicNote note={note} />
                    <div className="edit">
                        <button onClick={() => onRemoveNote(note.id)}><i className="far fa-trash-alt"></i></button>
                        <button><i className="fas fa-palette"></i></button>
                        <button onClick={()=> onUpdateNote(note)}> <i className="fas fa-edit"></i></button>
                    </div>
                </li>)}
        </ul>

    )

}

