export function NoteTodos({ note }) {
    return (
        <div className='noteTodos'>
            <h4>{note.info.label}</h4>
            <ul>
                {note.info.todos.map((todo,idx) =>
                    <li key={idx}>
                        <h5>{todo.txt} ,{todo.doneAt}</h5>
                    </li>)}
            </ul>
        </div >
    )
}

