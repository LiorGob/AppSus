import { keepService } from '../services/keep-service.js';
import { DynamicNote } from '../cmps/DynamicNote.jsx'


export class EditNote extends React.Component {

    state = {
        notes: [],
        note: {
            type: '',
            info: '',
            style: {
                backgroundColor: ''
            }
        }
    }


    componentDidMount() {
        this.loadNotes();
        const noteId = this.props.match.params.id
        if (noteId) {
            const note = keepService.getNoteById(noteId)
            this.setState({ note })
        }
    }

    // im here- have to edit the component
    onSaveNote = (ev) => {
        ev.preventDefault()
        keepService.updateNote(this.state.note)
            .then(notes => this.setState({ notes, note }))
    }

    changeInput = () => {
        let name = ev.target.name;
        let value = ev.target.value;
        this.setState({ type: name, info: value })
    }
    onInputChange = (ev) => {
        this.setState({ inputType: type, info: '' })
    }

    onkeyup = (ev) => {
        if (ev.keCode === 13) this.onAddNote();
    }


    DynamicNote(inputType) {
        switch (inputType) {
            case 'noteText':
                return <input onkeyup={this.onkeyup} type="text" value={this.state.info} onChange={this.changeInput} placeholder="enter a new note" name="txt" />
            default:
                return <h1>Something went wrong</h1>
        }
    }


    render() {

        return (
            <section>
                <div>{this.DynamicNote(this.state.inputType)}</div>
                <button onClick={this.onAddNote}>Add</button>
            </section>

        )


    }

}