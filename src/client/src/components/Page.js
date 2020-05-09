import React from 'react';
import '../assets/scss/components/Page.scss';


function Container(props) {

    return (
        <div className="page">
            {props.children}
        </div>
    )
}
export default Container;
