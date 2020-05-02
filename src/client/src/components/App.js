import React from 'react';
import '../assets/scss/components/App.scss';
import Sidebar from './Sidebar';
import Container from './Container';

function App() {

  return (
    <div className="app">
      <Sidebar></Sidebar>
      <div className="app__page">
          <Container></Container>
      </div>
    </div>
  );
}

export default App;
