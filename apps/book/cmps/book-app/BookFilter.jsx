
export function BookFilter(props) {
    // const { book } = this.props;
    return <section className="book-filter">
        <input type="text" placeholder="Filter By Name" onChange={(ev) => {
            props.onFilter(ev.target.value)
        }} />
      
    </section>
}
