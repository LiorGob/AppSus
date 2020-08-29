const { Link } = ReactRouterDOM
import { keepService } from '../apps/keep/services/keep-service.js';
import { NoteList } from '../apps/keep/cmps/NoteList.jsx';
import { eventBus } from '../services/event-bus-service.js'
// import { AddNote } from '../apps/keep/cmps/AddNote';
import { FilterNote } from '../apps/keep/cmps/FilterNote.jsx'
import { storageService } from '../services/storage-service.js';

export class KeepApp extends React.Component {

    state = {
        filterBy: '',
        notes: [],
        type: '',
        info: '',
        inputType: 'txt',
        // note: keepService.getEmpty()
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
            .then(notes => {
                this.setState({ notes, info: '' })
                // storageService.saveToStorage('notes', notes)
            })

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
            // ev.persist()
            let name = ev.target.name;
            let value = ev.target.value;
            this.setState({ type: name, info: value })
        }
    onInputChange = (type) => {
            this.setState({ inputType: type, info: '' })
        }

    onkeyup = (ev) => {
            if (ev.keCode === 13) this.onAddNote();
        }


    dynamicNote = (inputType) => {
            switch (inputType) {
                case 'txt':
                    return <input className="add-note" onKeyUp={this.onkeyup} type="text" value={this.state.info} onChange={this.changeInput} placeholder="What's on your mind.." name="NoteTxt" />
                case 'img':
                    return <input className="add-note" onKeyUp={this.onkeyup} type="text" value={this.state.info} onChange={this.changeInput} placeholder="Add image Url.." name="NoteImg" />
                case 'todo':
                    return <input className="add-note" onKeyUp={this.onkeyup} type="text" value={this.state.info} onChange={this.changeInput} placeholder="Add todos.." name="NoteTodos" />
                case 'video':
                    return <input className="add-note" onKeyUp={this.onkeyup} type="text" value={this.state.info} onChange={this.changeInput} placeholder="Add video Url.." name="NoteVideo" />
                default:
                    return <h1>Something went wrong...</h1>
            }

        }


    getNotesForDisplay() {
        const notes = this.state.notes.filter(note =>
            (note.info.txt || note.info.title || note.info.url || note.info.label).includes(this.state.filterBy.toLowerCase()))
        // console.log(notes);
        //    if(!note.info.txt || !note.info.title || !note.info.label) return ''
        return notes;

    }


    render() {
        const notes = this.getNotesForDisplay();
        // const notes = this.state.notes

        return(
            <section className = "keep-app-masonry" >
                <h1>KeepApp</h1>
                <FilterNote location={this.props.location} onFilter={this.setFilter} />
                <div>{this.dynamicNote(this.state.inputType)}</div>
                <div className="adding-note">
                    <button className="adding-note-btn" onClick={() => this.onInputChange('txt')} title="text"><i className="fas fa-font"></i></button>
                    <button className="adding-note-btn" onClick={() => this.onInputChange('img')} title="image"><i className="fas fa-mountain"></i></button>
                    <button className="adding-note-btn" onClick={() => this.onInputChange('todo')} title="todo"><i className="fas fa-list"></i></button>
                    <button className="adding-note-btn" onClick={() => this.onInputChange('video')} title="video"><i className="fab fa-youtube"></i></button>

                    <div onClick={this.onAddNote}><i className="keep fas fa-plus"></i></div>
                </div>
                <NoteList notes={notes.filter(note => note.isPinned)} onRemoveNote={this.onRemoveNote} onPinnedNote={this.onPinnedNote} />
                <NoteList notes={notes.filter(note => !note.isPinned)} onRemoveNote={this.onRemoveNote} onPinnedNote={this.onPinnedNote} />
            </section>
        )
    }
}

