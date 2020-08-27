// import { keepService } from '../services/keep-service.js';
// // import { DynamicNote } from '../cmps/DynamicNote.jsx'


// export class AddNote extends React.Component {

//     state = {
//         notes: [],
//         type: '',
//         info: '',
//         inputType: 'txt'
//     }


//     // componentDidMount() {
//     //     this.loadNotes();
//     // }

//     // loadNotes = () => {
//     //     keepService.query()
//     //         .then(notes => {
//     //             this.setState({ notes })
//     //         })
//     // }

//     onAddNote = () => {
//         if (this.state.info === '') return;
//         keepService.addNote(this.state.type, this.state.info)
//             .then(notes => this.setState({ notes, info: '' }))
//     }

//     changeInput = () => {
//         ev.persist()
//         let name = ev.target.name;
//         let value = ev.target.value;
//         this.setState({ type: name, info: value })
//     }
//     onInputChange = (ev) => {
//         this.setState({ inputType: type, info: '' })
//     }

//     onkeyup = (ev) => {
//         if (event.keCode === 13) this.onAddNote();
//     }


//     DynamicNote(inputType) {
//         switch (inputType) {
//             case 'noteText':
//                 return <input onkeyup={this.onkeyup} type="text" value={this.state.info} onChange={this.changeInput} placeholder="enter a new note" name="txt" />
//             default:
//                 return <h1>Something went wrong</h1>
//         }
//     }


//     render() {

//         return (
//             <section>
//                 <div>{this.DynamicNote(this.state.inputType)}</div>
//                 <button onClick={this.onAddNote}>Add</button>
//             </section>

//         )


//     }

// }