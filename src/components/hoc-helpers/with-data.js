import React, {Component} from "react";

import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";

const withData = (View) => {
    return class extends Component {

        state = {
            data: null,
            loading: true,
            error: false
        };

        componentDidMount() {
            this.update();
        };

        componentDidUpdate(prevProps) {
            if (this.props.getData !== prevProps.getData) {
                this.update();
            }
        };

        update() {
            this.setState({
                loading: true,
                error: false
            });

            this.props.getData()
                .then((data) => {
                    this.setState({
                        data,
                        loading: false,
                        error: false
                    });
                })
                .catch(() => {
                    this.setState({
                        loading: false,
                        error: true
                    });
                });
        };

        render() {

            const {data, loading, error} = this.state;

            if (loading) {
                return (
                    <div className="item-list list-group">
                        <Spinner/>
                    </div>
                );
            }
            if (error) {
                return (
                    <div className="item-list list-group">
                        <ErrorIndicator/>
                    </div>
                );
            }

            return <View {...this.props} data={data}/>
        };
    };
};

export default withData;
