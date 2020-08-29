const { Link } = ReactRouterDOM
import { bookService } from '../services/book-service.js'
// import { storageService } from '../services/storage-service'
import { BookFilter } from '../cmps/book-app/BookFilter.jsx'
import { BookList } from '../cmps/book-app/BookList.jsx';
import { BookDetails } from './BookDetails.jsx'
import { BookAdd } from '../cmps/book-app/BookAdd.jsx'


export class BookApp extends React.Component {
    state = {
        // petToAdd: petService.getEmpty(),
        filterBy: '',
        books: [],
        selectedBook: null
    }
    componentDidMount() {
        this.loadBooks();
    }
    loadBooks = () => {
        bookService.query()
            .then(books => {
                this.setState({ books })
            })
    }
    // selectBook = (book) => {
    //     this.setState({ selectedBook: book })
    // }
    // onInputChange = (ev) => {
    //     console.log('Input:', ev.target.name);
    //     console.log('Changed', ev.target.value);
    //     const value = ev.target.type === 'number' ? +ev.target.value : ev.target.value
    //     this.setState({ book: { ...this.state.book, [ev.target.title]: value } })
    // }
    setFilter = (filterBy) => {
        this.setState({ filterBy });
        this.loadBooks();
    }

    getBooksForDisplay() {
        const books = this.state.books.filter(book =>
            book.title.toLowerCase().includes(this.state.filterBy.toLowerCase()))
        return books;
    }

    render() {
        const { selectedBook } = this.state
        const books = this.getBooksForDisplay();
        return (
            <section className="book-app">
                <BookAdd loadBooks={this.loadBooks} />
                {!selectedBook && <BookFilter onFilter={this.setFilter} />}
                {!selectedBook && <BookList books={books} />}
                {selectedBook && <BookDetails book={selectedBook} />}

            </section>

        )

    }

}

// filterBy={this.state.filterBy}

{/* <BookFilter filterBy={this.state.filterBy} onSetFilter={this.onSetFilter}/>
<BookList onSelectBook={this.onSelectBook} books={booksToShow} />
<BookDetails book={selectedBook} onUnSelectBook={this.onUnSelectBook} /> */}