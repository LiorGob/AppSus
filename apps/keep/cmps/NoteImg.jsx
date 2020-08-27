export function NoteImg({ note }) {
    return (
        <div className='noteImg'>
            <img src={note.info.url} />
        </div>

    )

}
