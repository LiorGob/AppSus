export function NoteImg({ note }) {
    return (
        <div className='noteImg'>
            <h4>{note.info.title}</h4>
            <img src={note.info.url} />
        </div>

    )

}
