// @flow
import React from 'react';
import styled from 'styled-components';
import Monitor from './Monitor/Monitor';

const Grid = styled.div`
  display: flex;
  background-color: gray;
  padding: 25px;
  justify-content: center;
  @media (max-aspect-ratio: 5/4) {
    flex-direction: column-reverse;
    padding: 0px;
  }
`;

const LeftCol = styled.div`
  width: calc(100vw - ((100vh - 75px) / 2 * (16 / 9)));
  max-width: 800px;
  margin-right: 25px;
  @media (max-aspect-ratio: 5/4) {
    width: 100%;
    height: calc(100vh - ((100vw - 50px) * (9 / 16)) - 25px);
  }
`;

const RightCol = styled.div`
  
`;

const MonitorWrapper = styled.div`
  width: calc((100vh - 75px) / 2 * (16 / 9));
  height: calc((100vh - 75px) / 2);
  :not(:last-of-type) {
    margin-bottom: 25px;
  }
  @media (max-aspect-ratio: 5/4) {
    width: calc(100vw - 50px);
    margin: 0px 25px;
    height: calc((100vw - 50px) * (9 / 16));
    :last-of-type {
      display: none;
    }
  }

`;

const TitleListWrapper = styled.div`
  background-color: white;
  height: 100%;
  width: 100%;
`;

const Live = () => (
  <Grid>
    <LeftCol>
      <TitleListWrapper />
    </LeftCol>
    <RightCol>
      <MonitorWrapper title="">
        <Monitor style={{}} title="Preview" />
      </MonitorWrapper>
      <MonitorWrapper>
        <Monitor title="Program" />
      </MonitorWrapper>
    </RightCol>
  </Grid>
);

export default Live;
