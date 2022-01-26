import React from "react";

import {withSwapiService} from "../hoc-helpers";

import ItemDetails from "../item-details";
import {Record} from "../item-details/item-details";

const PersonDetails = (props) => {
    return (
        <ItemDetails {...props}>
            <Record field='gender' label='Gender'/>
            <Record field='eyeColor' label='Eye Color'/>
        </ItemDetails>
    );
};

const mapMethoddsToProps = (swapiService) => {
    return {
        getData: swapiService.getPerson,
        getImageUrl: swapiService.getPersonImage
    };
};

export default withSwapiService(PersonDetails, mapMethoddsToProps);
