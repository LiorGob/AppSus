const { Link } = ReactRouterDOM
import { keepService } from '../apps/keep/services/keep-service.js';
import { NoteList } from '../apps/keep/cmps/NoteList.jsx';
import { eventBus } from '../services/event-bus-service.js'
// import { AddNote } from '../apps/keep/cmps/AddNote';

export class KeepApp extends React.Component {

    state = {
        filterBy: '',
        notes: [],
        type: '',
        info: '',
        inputType: 'txt'
    }
    componentDidMount() {
        this.loadNotes();
    }

    loadNotes = () => {
        keepService.query()
            .then(notes => {
                this.setState({ notes })
            })
    }

    setFilter = (filterBy) => {
        this.setState({ filterBy });
        this.loadBooks();
    }


    onAddNote = () => {
        if (this.state.info === '') return;
        keepService.addNote(this.state.type, this.state.info)
            .then(notes => this.setState({ notes, info: '' }))
    }

    onRemoveNote = (noteId) => {
        keepService.removeNote(noteId)
        this.loadNotes();
    }

    onPinnedNote = () => {
        keepService.setPinNote(this.props.note);
    }

    changeInput = (ev) => {
        ev.persist()
        let name = ev.target.name;
        let value = ev.target.value;
        this.setState({ type: name, info: value })
    }
    // onInputChange = (ev) => {
    //     this.setState({ inputType: type, info: '' })
    // }

    onkeyup = (ev) => {
        if (ev.keCode === 13) this.onAddNote();
    }


    dynamicNote = (inputType) => {
        switch (inputType) {
            case 'txt':
                return <input onKeyUp={this.onkeyup} type="text" value={this.state.info} onChange={this.changeInput} placeholder="enter a new note" name="txt" />
            default:
                return <h1>Something went wrong...</h1>
        }
    }


    getNotesForDisplay() {
        const notes = this.state.notes.filter(note =>
            note.info.txt.toLowerCase().includes(this.state.filterBy.toLowerCase()))
        return notes;
    }


    render() {
        const notes = this.getNotesForDisplay();

        return (
            <section className="keep-app-masonry">
                <h1>KeepApp</h1>
                <div>{this.dynamicNote(this.state.inputType)}</div>
                <button onClick={this.onAddNote}>Add</button>
                <NoteList notes={notes} onRemoveNote={this.onRemoveNote} onPinnedNote={this.onPinnedNote}/>
             
            </section>
        )
    }
}


// openModal={this.onOpenModal}