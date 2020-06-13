// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  margin: 8px;
  font-family: initial;
`;

const Header = styled.h1`
  margin-top: 0px;
`;

const Splash = () => (
  <Container>
    <Header>RPI TV Hockey Title Management System (v2)</Header>
    <h2>List of Current Pages:</h2>
    <ul>
      <li>
        <Link to="/live">Titles UI (React)</Link>
        &nbsp;- Main user interface for editing titles and sending them to the keyer.
      </li>
    </ul>
    <h3>List of Deprecated Pages:</h3>
    <ul>
      <li>None!</li>
    </ul>
    <img src="#" style={{ width: '700px', height: '70px' }} alt="If this text is visible, this app is not yet able to render titles" />
  </Container>
);

export default Splash;
