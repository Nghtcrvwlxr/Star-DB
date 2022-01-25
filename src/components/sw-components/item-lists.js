import React from "react";

import SwapiService from "../../services/swapi-service";

import {withData} from "../hoc-helpers";
import ItemList from "../item-list";

const swapiService = new SwapiService();

const {getAllPeople, getAllPlanets, getAllStarships} = swapiService;

const withChildFunction = (Wrapped, fn) => {
    return (props) => {
        return (
            <Wrapped {...props}>
                {fn}
            </Wrapped>
        );
    };
};

const renderName = ({name}) => <span>{name}</span>;
const renderNameAndDiameter = ({name, diameter}) => <span>{name} ({diameter})</span>;
const renderNameAndModel = ({name, model}) => <span>{name} ({model})</span>;

const PersonList = withData(
    withChildFunction(ItemList, renderName),
    getAllPeople
);
const PlanetList = withData(
    withChildFunction(ItemList, renderNameAndDiameter),
    getAllPlanets
);
const StarshipList = withData(
    withChildFunction(ItemList, renderNameAndModel),
    getAllStarships
);

export {PersonList, PlanetList, StarshipList};