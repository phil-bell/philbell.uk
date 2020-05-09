import React from 'react';
import '../assets/scss/components/Admin.scss';
import Container from './Container';

function Admin() {

    return (
        <div className="admin">
            <Container>
                <div className="app__content">
                    <p className="app__content__text">Hello there! admin</p>
                </div>
            </Container>
        </div>
    )
}
export default Admin;
