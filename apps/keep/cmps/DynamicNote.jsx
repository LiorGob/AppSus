import { NoteTxt } from './NoteTxt.jsx'
import {NoteImg} from './NoteImg.jsx'
import {NoteTodos} from './NoteTodos.jsx'
import {NoteVideo} from './NoteVideo.jsx'

export function DynamicNote(props) {
    switch (props.note.type) {
        case 'NoteTxt': 
            return <NoteTxt {...props} />
            case 'NoteImg': 
            return <NoteImg {...props} />
            case 'NoteTodos': 
            return <NoteTodos {...props} />
            case 'NoteVideo': 
            return <NoteVideo {...props} />
        default:
            return <h1>Something went wrong</h1>
    }
}

