import { NoteTxt } from './NoteTxt.jsx'
import {NoteImg} from './NoteImg.jsx'
// import {NoteTodos} from './NoteTodos.jsx'

export function DynamicNote(props) {
    switch (props.note.type) {
        case 'noteText': 
        case 'txt':
            return <NoteTxt {...props} />
            case 'noteImg': 
            // case 'txt':
            return <NoteImg {...props} />
            // case 'noteTodos': 
            // case 'txt':
            // return <NoteTodos {...props} />
        default:
            return <h1>Something went wrong</h1>
    }
}

