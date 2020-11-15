
export function EmailSideBar(props) {
    return (
        <div className="side-bar flex column">
            <button onClick={() => props.openCompose()} className={'compose-button'}><i className="email fas fa-plus"></i></button>
            {/* <div className="email-route"> */}
                <ul className="EmailSideBar-icons flex column">
                    <div className="inbox">
                        <li onClick={() => props.onChangeSection('income')}>Inbox({props.unreadMailAmount})
                    <i className="inbox fas fa-envelope-open-text"></i></li>
                    </div>
                    <div className="Sent">
                        <li onClick={() => props.onChangeSection('outcome')}>Sent
                    <i className="sent far fa-paper-plane"></i></li>
                    </div>
                    <div className="star" >
                        <li onClick={() => props.onChangeSection('starred')}>Starred
                  <i className="star fas fa-star"></i></li>
                    </div>
                    <div className="Trash" >
                        <li onClick={() => props.onChangeSection('trash')}>Trash
                    <i className="email-trash-bar far fa-trash-alt"></i></li>
                    </div>
                </ul>
            </div>
        // </div>
    )
}
