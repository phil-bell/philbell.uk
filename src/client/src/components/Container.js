import React from 'react';
import '../assets/scss/components/Container.scss';

function Container(props) {

    return (
        <div className="container">
            <div className="app__content">
                <p className="app__content__text">{props.children}</p>
            </div>
        </div>
    )
}
export default Container;
