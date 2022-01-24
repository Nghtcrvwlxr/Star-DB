import React, {Component} from "react";

import SwapiService from "../../services/swapi-service";

import Spinner from "../spinner";
import ErrorButton from "../error-button";

import './person-details.css';

export default class PersonDetails extends Component {

    swapiService = new SwapiService();

    state = {
        person: null,
        loading: false
    };

    componentDidMount() {
        this.updatePerson();
    };

    componentDidUpdate(prevProps, prevState) {
        if (this.props.personId !== prevProps.personId) {
            this.updatePerson();
        }
    };

    updatePerson() {
        const {personId} = this.props;
        if (!personId) {
            return;
        }

        this.setState({
            loading: true
        });

        this.swapiService
            .getPerson(personId)
            .then((person) => {
                this.setState({
                    person,
                    loading: false
                });
            });
    };

    render() {

        if (this.state.loading) {
            return (
                <div className="person-details card">
                    <Spinner/>
                </div>
            );
        }

        if (!this.state.person) {
            return (
                <div className="person-details card">
                    <span>Select a person from the list</span>
                </div>
            );
        }

        const {id, name, gender, birthYear, eyeColor} = this.state.person;

        return (
            <div className="person-details card">
                <img className="person-image"
                     src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} alt='person'/>

                <div className="card-body">
                    <h4>{name}</h4>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <span className="term">Gender</span>
                            <span>{gender}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Birth Year</span>
                            <span>{birthYear}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Eye Color</span>
                            <span>{eyeColor}</span>
                        </li>
                    </ul>

                    <ErrorButton/>
                </div>
            </div>
        );
    };
}
