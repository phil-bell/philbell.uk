import React from 'react';
import '../assets/scss/components/Home.scss';
import Container from './Container';

function Home() {

    return (
        <div className="home">
            <Container>
                <div className="app__content">
                    <p className="app__content__text">Hello there! home</p>
                </div>
            </Container>
        </div>
    )
}
export default Home;
