const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM
import { AppHeader } from './cmps/AppHeader.jsx'
import { Home } from './pages/Home.jsx'
import {KeepApp} from './pages/KeepApp.jsx'
import {EmailApp} from './pages/EmailApp.jsx'
import {BookApp} from './apps/book/pages/BookApp.jsx'
import {EmailDetails} from './apps/mail/pages/EmailDetails.jsx'
import {BookDetails} from './apps/book/pages/BookDetails.jsx'
// import {OpenNavBar} from './cmps/OpenNavBar.jsx'
export class App extends React.Component {


    render() {
        return (
            <Router>
                <div>
                    <AppHeader /> 
                    {/* <OpenNavBar></OpenNavBar> */}
                    <main>
                        <Switch>
                            <Route component={EmailDetails} path="/email/:emailId"/>
                            <Route component={EmailApp} path="/email" />
                            <Route component={KeepApp} path="/keep" />
                            <Route component={BookDetails} path="/book/:bookId" />
                            <Route component={BookApp}  path="/book"/>
                            <Route component={Home} path="/" />
                        </Switch>

                    </main>
                </div>
            </Router>

        )
    }


}