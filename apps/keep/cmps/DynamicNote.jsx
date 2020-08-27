import { NoteTxt } from './NoteTxt.jsx'

export function DynamicNote(props) {
    switch (props.note.type) {
        case 'noteText': 
        case 'txt':
            return <NoteTxt {...props} />
        default:
            return <h1>Something went wrong</h1>
    }
}

