import React, {Component} from "react";

import SwapiService from "../../services/swapi-service";
import TestService from "../../services/test-service";
import {SwapiServiceProvider} from "../swapi-service-context";

import {BrowserRouter as Router, Route} from "react-router-dom";

import Header from "../header";
import RandomPlanet from "../random-planet";
import ErrorButton from "../error-button";
import {PeoplePage, PlanetsPage, StarshipsPage} from "../pages";
import {LoginPage, SecretPage} from "../pages";
import {StarshipDetails} from "../sw-components";
import ErrorBoundary from "../error-boundary";

import './app.css';

export default class App extends Component {

    state = {
        swapiService: new SwapiService(),
        showRandomPlanet: true,
        hasError: false,
        isLoggedIn: false
    };

    onLogin = () => {
        this.setState({
            isLoggedIn: true
        });
    };

    onServiceChange = () => {
        this.setState(({swapiService}) => {
            const Service = swapiService instanceof SwapiService ? TestService : SwapiService;

            return {
                swapiService: new Service()
            };
        });
    };

    toggleRandomPlanet = () => {
        this.setState((state) => {
            return {
                showRandomPlanet: !state.showRandomPlanet
            };
        });
    };

    componentDidCatch() {
        this.setState({hasError: true});
    };

    render() {
        const planet = this.state.showRandomPlanet ? <RandomPlanet updateInterval={3000}/> : null;

        return (
            <ErrorBoundary>
                <SwapiServiceProvider value={this.state.swapiService}>
                    <Router>
                        <div className='app'>
                            <Header onServiceChange={this.onServiceChange}/>

                            <ErrorBoundary>
                                {planet}

                                <div className='row-mb-2 button-row'>
                                    <button className='toggle-planet btn btn-warning btn-lg'
                                            onClick={this.toggleRandomPlanet}>
                                        Toggle Random Planet
                                    </button>
                                    <ErrorButton/>
                                </div>
                            </ErrorBoundary>

                            <Route path='/' render={() => <h2>Welcome to Star DB</h2>} exact/>

                            <Route path='/people' exact render={() => <h2>People</h2>}/>
                            <Route path='/people/:id?' component={PeoplePage}/>

                            <Route path='/planets' exact render={() => <h2>Planets</h2>}/>
                            <Route path='/planets' component={PlanetsPage}/>

                            <Route path='/starships' exact render={() => <h2>Starships</h2>}/>
                            <Route path='/starships' exact component={StarshipsPage}/>
                            <Route path='/starships/:id'
                                   render={({match}) => {
                                       const {id} = match.params;
                                       return <StarshipDetails itemId={id}/>
                                   }}/>

                            <Route path='/login'
                                   render={() => (<LoginPage isLoggedIn={this.state.isLoggedIn}
                                                             onLogin={this.onLogin}/>)}/>
                            <Route path='/secret'
                                   render={() => (<SecretPage isLoggedIn={this.state.isLoggedIn}/>)}/>
                        </div>
                    </Router>
                </SwapiServiceProvider>
            </ErrorBoundary>
        );
    };
}
