export function NoteTodos({ note }) {
    return (
        <div className='noteTodos'>
            <div>{note.info.todos[0].txt}</div>
        </div>

    )

}

{/* <div>{note.info.todos.map(todo, idx => { return <li key={idx}>{note.info.todos[idx].txt}</li> })}</div> */}