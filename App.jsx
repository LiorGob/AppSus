const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM
import { AppHeader } from './cmps/AppHeader.jsx'
import { Home } from './pages/Home.jsx'
import {KeepApp} from './pages/KeepApp.jsx'

export class App extends React.Component {


    render() {
        return (
            <Router>
                <div>
                    <AppHeader />
                    <main>
                        <Switch>
                            {/* <Route component={EmailApp} /> */}
                            <Route component={KeepApp} path="/keep" />
                            {/* <Route component={BookApp} /> */}
                            <Route component={Home} path="/" />
                        </Switch>

                    </main>
                </div>
            </Router>

        )
    }


}