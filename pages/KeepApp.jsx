const { Link } = ReactRouterDOM
import { keepService } from '../apps/keep/services/keep-service.js';
import { NoteList } from '../apps/keep/cmps/NoteList.jsx';
import { eventBus } from '../services/event-bus-service.js'
// import { AddNote } from '../apps/keep/cmps/AddNote';
import { FilterNote } from '../apps/keep/cmps/FilterNote.jsx'

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
        this.props.history.push(`/keep?filterBy=${filterBy}`)
        this.setState({ filterBy })
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

    onPinnedNote = (note) => {
        keepService.setPinNote(note)
        this.loadNotes()
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
                return <input className="add-note" onKeyUp={this.onkeyup} type="txt" value={this.state.info} onChange={this.changeInput} placeholder="What's on your mind.." name="NoteTxt" />
            default:
                return <h1>Something went wrong...</h1>
        }
    }


    getNotesForDisplay() {
        const notes = this.state.notes.filter(note =>
            (note.info.txt || note.info.title ||note.info.label).toLowerCase().includes(this.state.filterBy.toLowerCase()))
        return notes;
    }


    render() {
        const notes = this.getNotesForDisplay();

        return (
            <section className="keep-app-masonry">
                <h1>KeepApp</h1>
                <FilterNote location={this.props.location} onFilter={this.setFilter} />
                <div>{this.dynamicNote(this.state.inputType)}</div>
                <div className="adding-note">
                    <div><i className="fas fa-font"></i></div>
                    <div><i className="fas fa-mountain"></i></div>
                    <div><i className="fab fa-youtube"></i></div>
                    <div><i className="fas fa-list"></i></div>
                    <div onClick={this.onAddNote}><i className="fas fa-plus"></i></div>
                </div>
                <NoteList notes={notes.filter(note => note.isPinned)} onRemoveNote={this.onRemoveNote} onPinnedNote={this.onPinnedNote} />
                <NoteList notes={notes.filter(note => !note.isPinned)} onRemoveNote={this.onRemoveNote} onPinnedNote={this.onPinnedNote} />
            </section>
        )
    }
}

