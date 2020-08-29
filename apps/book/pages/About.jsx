const { NavLink, Route, Switch } = ReactRouterDOM
export default function About() {

    function Staff(props) {
        return <div>
            <h3>our Staff</h3>
            <li>Lital</li>
            <li>Shirly</li>
            <li>Lior</li>
        </div>
    }

    function Vision(props) {
        return <div>
            <h3>Our Vision</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem at, accusantium error quod natus illo debitis esse amet.</p>
        </div>
    }
    return (
        <div className="about">
            <h2>About</h2>
            <ul>
                <li><NavLink to="/about/staff">Our Staff</NavLink></li>
                <li><NavLink to="/about/vision">Our Vision</NavLink></li>
            </ul>
            <Switch>
                <Route component={Staff} path="/about/staff" />
                <Route component={Vision} path="/about/vision" />
            </Switch>
            <img src="./assets/img/cover.png" />
        </div>
    )



}