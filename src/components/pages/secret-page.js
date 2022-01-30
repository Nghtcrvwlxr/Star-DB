import React from "react";

import {Redirect} from "react-router-dom";

const SecretPage = ({isLoggedIn}) => {
    if (isLoggedIn) {
        return (
            <div className='secret-page text-center'>
                <h3>Welcome to the Secret page</h3>
            </div>
        );
    }

    return <Redirect to='/login'/>
};

export default SecretPage;