import React from "react";

import {withSwapiService} from "../hoc-helpers";

import ItemDetails from "../item-details";
import {Record} from "../item-details/item-details";

const PlanetDetails = (props) => {
    return (
        <ItemDetails {...props}>
            <Record field='population' label='Population'/>
            <Record field='rotation' label='Rotation'/>
            <Record field='diameter' label='Diameter'/>
        </ItemDetails>
    );
};

const mapMethoddsToProps = (swapiService) => {
    return {
        getData: swapiService.getPlanet,
        getImageUrl: swapiService.getPlanetImage
    };
};

export default withSwapiService(PlanetDetails, mapMethoddsToProps);
