
export class LongTxt extends React.Component {
    state = { isLongTxtShown: false }
    toggleShowTxt = () => {
        this.setState({ isLongTxtShown: !this.state.isLongTxtShown })
    }
    render() {
        const { txt } = this.props;
        const txtLength = this.state.isLongTxtShown;
        return <p className={`${txt.length > 100 ? 'all-text' : ''}`} onClick={this.toggleShowTxt}>
            {(txtLength || txt.length <= 100) ? txt : txt.substr(0, 100) + '...'}
        </p>

    }
}


{/* // Show only 100 characters of the description and add read more/less that toggles the rest of the text
// TIP: build a component that can be used like this:
// <LongTxt text={book. description} isLongTxtShown={this.state.isLongTxtShown} /> */}