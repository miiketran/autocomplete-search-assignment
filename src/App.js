import React, { Component } from 'react';
import Home from './scenes/Home';
// import 'semantic-ui-css/semantic.min.css';
import styled from 'styled-components';
import './App.css';

const Header = styled('header')`
  background-image: url(https://www.personalcapital.com/static/images/website3/about-us/our-story/img_hero_large.jpg);
  background-size: cover !important;
  overflow: hidden;
  height: 300px;
  padding: 20px;
  background-position: bottom center;
  background-repeat: no-repeat;
  color: white;
`;

const TextContainer = styled('div')`
  padding: 100px 15px;
  text-align: center;
`;
const H1 = styled('h1')`
  font-size: 40px;
  color: white;
  line-height: 50px;
  text-shadow: 0px 0px 6px rgba(0, 0, 0, 0.4);
  margin-bottom: 50px;
`;

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header>
          <TextContainer>
            <H1>Financial Institutions Look Up</H1>
          </TextContainer>
        </Header>
        <Home />
      </div>
    );
  }
}

export default App;
