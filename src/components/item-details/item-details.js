import React, {Component} from "react";

import Spinner from "../spinner";
import ErrorButton from "../error-button";

import './item-details.css';

            //FIXME: item-details refactoring
            const Record = ({item, field, label}) => {
                return (
                    <li className="list-group-item">
                        <span className="term">{label}</span>
                        <span>{field}</span>
                    </li>
                );
            };

            export {Record};
            //

export default class ItemDetails extends Component {

    state = {
        item: null,
        image: null,
        loading: false
    };

    componentDidMount() {
        this.updateItem();
    };

    componentDidUpdate(prevProps, prevState) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    };

    updateItem() {
        const {itemId, getData, getImageUrl} = this.props;
        if (!itemId) {
            return;
        }

        this.setState({
            loading: true
        });

        getData(itemId)
            .then((item) => {
                this.setState({
                    item,
                    image: getImageUrl(item),
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

        if (!this.state.item) {
            return (
                <div className="person-details card">
                    <span>Select a person from the list</span>
                </div>
            );
        }

        const {id, name, gender, birthYear, eyeColor} = this.state.item;

        return (
            <div className="person-details card">
                <img className="person-image"
                     src={this.state.image} alt='person'/>

                <div className="card-body">
                    <h4>{name}</h4>
                    <ul className="list-group list-group-flush">
                        {
                            React.Children.map(this.props.children, (child) => {
                                return child;
                            })
                        }
                    </ul>

                    <ErrorButton/>
                </div>
            </div>
        );
    };
}
