import React, {Component} from "react";

import Header from "../header";
import RandomPlanet from "../random-planet";
import PeoplePage from "../people-page";
import ErrorButton from "../error-button";
import ErrorIndicator from "../error-indicator";

import './app.css';

            //FIXME: item-details refactoring
            import Row from "../row";
            import ItemDetails from "../item-details";
            import {Record} from "../item-details/item-details";
            import SwapiService from "../../services/swapi-service";
            //

export default class App extends Component {

            //FIXME: item-details refactoring
            swapiService = new SwapiService();
            //

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

        if (this.state.hasError) {
            return <ErrorIndicator/>
        }

        const planet = this.state.showRandomPlanet ? <RandomPlanet/> : null;

            //FIXME: item-details refactoring
            const {getPerson, getStarship, getPersonImage, getStarshipImage} = this.swapiService;

            const personDetails = (
                <ItemDetails itemId={11}
                             getData={getPerson}
                             getImageUrl={getPersonImage}>

                    <Record field='gender' label='Gender'/>
                    <Record field='eyeColor' label='Eye Color'/>

                </ItemDetails>
            );
            const starshipDetails = (
                <ItemDetails itemId={5}
                             getData={getStarship}
                             getImageUrl={getStarshipImage}>
                </ItemDetails>
            );
            //

        return (
            <div className='app'>
                <Header />
                {/*{planet}*/}

               {/* <div className='row-mb-2 button-row'>
                    <button className='toggle-planet btn btn-warning btn-lg'
                            onClick={this.toggleRandomPlanet}>
                        Toggle Random Planet
                    </button>
                    <ErrorButton/>
                </div>*/}

                {/*<PeoplePage/>*/}

                <Row left={personDetails} right={starshipDetails}/>
            </div>
        );
    };
}
