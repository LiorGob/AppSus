const { NavLink, withRouter } = ReactRouterDOM

function _AppHeader(props) {
    function goBack() {
        props.history.goBack()
    }
    return (
        <header className="main-header">
            <div className="logo"></div>
            <NavLink activeClassName='home-nav' to="/">Home</NavLink>
            <NavLink>Book</NavLink>
            <NavLink to="/email">Email</NavLink>
            <NavLink to="/keep">Keep</NavLink>
            <button onClick={goBack}>Back</button>
        </header>
    )

}

export const AppHeader = withRouter(_AppHeader)