import React, {Component} from "react";
import Row from "../row";
import {StarshipDetails, StarshipList} from "../sw-components";

export default class StarshipsPage extends Component {

    state = {
        selectedItem: null
    };

    onItemSelected = (selectedItem) => {
        this.setState({selectedItem})
    };

    render() {
        const {selectedItem} = this.state;

        return (
            <Row left={<StarshipList onItemSelected={this.onItemSelected}/>}
                 right={<StarshipDetails itemId={selectedItem}/>}/>
        );
    };
}