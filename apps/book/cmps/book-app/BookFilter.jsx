
export function BookFilter(props) {
    // const { book } = this.props;
    return <section className="book-filter">
        <h3>Filter The List By Title And Price</h3>
        <input type="text" placeholder="Filter By Name" onChange={(ev) => {
            props.onFilter(ev.target.value)
        }} />
        <input type="range" min="20" max="200" placeholder="Filter By Price" onChange={(ev) => {
            props.onFilter(ev.target.value)
        }} />
    </section>
}

// add it to the function:
// handleInputChange(event) {
//     const target = event.target;
//     const value = target.type === 'checkbox' ? target.checked : target.value;
//     const name = target.name;

// BookFilter>
// • Allow the user to filter the books list by name and by price range
// • Invoke the setFilter function given by the props to change the state of <BookApp> when filter
// button is clicked.

// <form onSubmit={ this.addPet }>
// <input name="name" value={ this.state.petToAdd.name }
//     placeholder="Pet Name" type="text"
//     onChange={ this.onInputChange }
// />
// <input name="power" value={ this.state.petToAdd.power }
//     placeholder="Pet Power" type="text"
//     onChange={ this.onInputChange }
// />
// <button onClick={ this.addPet }>Add Pet</button>
// </form>