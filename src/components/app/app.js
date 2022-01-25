import React, {Component} from "react";

import Header from "../header";
import RandomPlanet from "../random-planet";
import PeoplePage from "../people-page";
import ErrorButton from "../error-button";
import {PersonList, PlanetList, StarshipList} from "../sw-components";
import {PersonDetails, PlanetDetails, StarshipDetails} from "../sw-components";
import ErrorBoundary from "../error-boundary";

import './app.css';

export default class App extends Component {

    state = {
        showRandomPlanet: true,
        hasError: false
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
        const planet = this.state.showRandomPlanet ? <RandomPlanet/> : null;

        return (
            <ErrorBoundary>
                <div className='app'>
                    <Header />
                    {/*{planet}*/}

                     {/*<div className='row-mb-2 button-row'>
                        <button className='toggle-planet btn btn-warning btn-lg'
                                onClick={this.toggleRandomPlanet}>
                            Toggle Random Planet
                        </button>
                        <ErrorButton/>
                     </div>*/}

                    {/*<PeoplePage/>*/}

                    <PersonList>
                        {({name}) => <span>{name}</span>}
                    </PersonList>
                    <PlanetList>
                        {({name}) => <span>{name}</span>}
                    </PlanetList>
                    <StarshipList>
                        {({name}) => <span>{name}</span>}
                    </StarshipList>

                    <PersonDetails itemId={11}/>
                    <PlanetDetails itemId={9}/>
                    <StarshipDetails itemId={10}/>

                </div>
            </ErrorBoundary>
        );
    };
}
