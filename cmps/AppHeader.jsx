const { NavLink, withRouter } = ReactRouterDOM

function _AppHeader(props) {
    function goBack() {
        props.history.goBack()
    }

    return (
        <header className="main-header">
            <div className="logo">AppSus</div>
            <div onClick={goBack}><i className="fas fa-arrow-left"></i></div>
            <NavLink className='home-nav' to="/"><i className="fas fa-home"></i></NavLink>
            <NavLink className='book-nav' to="/book"><i className="fas fa-book-open"></i></NavLink>
            <NavLink to="/email"><i className="fas fa-envelope-open-text"></i></NavLink>
            <NavLink to="/keep"><i className="fas fa-lightbulb"></i></NavLink>
            {/* <button onClick={openHeader} className="hamburger" hidden><i className="fas fa-bars"></i></button> */}
            {/* hidden> */}

        </header>
    )

}

export const AppHeader = withRouter(_AppHeader)