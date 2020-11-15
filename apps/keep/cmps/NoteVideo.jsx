export function NoteVideo({ note }) {
    function getUrl(url) {
        if (!url) return
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11)
            ? match[2]
            : null;
    }
    const video= getUrl(note.info.url);
    return (
        <div className='noteVideo'>
            <h4>{note.info.title}</h4>
            <iframe src={'https://www.youtube.com/embed/' +video}
                width="200" height="200">
            </iframe>
        </div>
    )
}

