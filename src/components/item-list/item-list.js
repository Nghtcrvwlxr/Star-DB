import React, {Component} from "react";

import SwapiService from "../../services/swapi-service";

import Spinner from "../spinner";

import './item-list.css';


export default class ItemList extends Component {

    swapiService = new SwapiService();

    state = {
        people: null
    };

    componentDidMount() {
        this.swapiService
            .getAllPeople()
            .then((people) => {
                this.setState({
                    people
                });
            });
    };

    renderItems = (arr) => {
        return arr.map((person) => {
            const {id, name} = person;
            return (
                <li className="list-group-item"
                    key={id}
                    onClick={() => this.props.onItemSelected(id)}>
                    {name}
                </li>
            );
        });
    };

    render() {

        const {people} = this.state;

        if (!people) {
            return (
                <div className="item-list list-group">
                    <Spinner/>
                </div>
            );
        }

        const items = this.renderItems(people);

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    };
}
