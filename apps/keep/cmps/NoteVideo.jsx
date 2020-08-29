export function NoteVideo({ note }) {
    return (
        <div className='noteVideo'>
            <h4>{note.info.title}</h4>
            <video src={note.info.url} width="200" height="200" controls="controls" autoplay="true"></video>
            {/* <iframe src={note.info.url} width="200" height="200"></iframe> */}
        </div>

    )

}

