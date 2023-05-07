import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import MovieForm from "./components/movieForm";
import NavBar from "./components/navBar";
import Customers from "./components/customers/customers";
import Rentals from "./components/rentals/rentals";
import Movies from "./components/movies";
import NotFound from "./components/notFound";
import ProtectedRoute from "./components/common/protectedRoute";
import Logout from "./components/logout";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import authService from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
    state = {};

    componentDidMount() {
        const user = authService.getCurrentUser();
        this.setState({ user });
    }

    render() {
        const { user } = this.state;
        return (
            <React.Fragment>
                <ToastContainer />
                <NavBar user={user} />
                <main className="container">
                    <Switch>
                        <Route path="/register" component={RegisterForm} />
                        <Route path="/login" component={LoginForm} />
                        <Route path="/logout" component={Logout} />
                        <ProtectedRoute path="/movies/:id" component={MovieForm} />
                        <Route path="/rentals" component={Rentals} />
                        <Route path="/customers" component={Customers} />
                        <Route path="/movies" render={(props) => <Movies {...props} user={user} />} />
                        <Route path="/not-found" component={NotFound} />
                        <Redirect from="/" to="/movies" />
                        <Redirect to="/not-found" />
                    </Switch>
                </main>
            </React.Fragment>
        );
    }
}

export default App;
