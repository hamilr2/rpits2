// @flow
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import type { Event, Title } from '../../coreTypes';
import * as actions from '../../store/actions/live';
import Monitor from './Monitor/Monitor';
import Tabs from './Tabs/Tabs';
import TitleList from './TitleList/TitleList';

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
  height: calc(100vh - 50px);
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
  overflow: scroll;
  width: 100%;
`;

type Props = {
  getEvent: (number) => void,
  getTitleList: ({ eventId?: number, team?: string }) => void,
  event: Event,
  eventTitleLists: {
    [key: string]: Array<Title>,
  }
}

type State = {
  selectedTitleList: string,
};

const Live = (props: Props) => {
  const { event, eventTitleLists, getEvent, getTitleList } = props;
  const [{ selectedTitleList }, setState]: [State, Function] = useState({
    selectedTitleList: 'main',
  });
  useEffect(() => {
    getEvent(1);
  }, [getEvent]);

  useEffect(() => {
    if (event) {
      getTitleList({ eventId: event.id });
      getTitleList({ team: event.team1 });
      getTitleList({ team: event.team2 });
    }
  }, [event, getTitleList]);

  let tabItems = [];
  let titleLists = [];

  if (event) {
    tabItems = [
      {
        name: 'Titles',
        id: 'main',
      },
      {
        name: `${event.team1} Players`,
        id: event.team1,
      },
      {
        name: `${event.team2} Players`,
        id: event.team2,
      },
    ];

    titleLists = [
      <TitleList
        id="main"
        key="main"
        active={selectedTitleList === 'main'}
        titles={eventTitleLists.main}
      />,
      <TitleList
        id={event.team1}
        key={event.team1}
        active={selectedTitleList === event.team1}
        titles={eventTitleLists[event.team1]}
      />,
      <TitleList
        id={event.team2}
        key={event.team2}
        active={selectedTitleList === event.team2}
        titles={eventTitleLists[event.team2]}
      />,
    ];
  }

  return (
    <Grid>
      <LeftCol>
        <TitleListWrapper>
          <Tabs
            items={tabItems}
            click={(tabId) => setState((prevState) => ({
              ...prevState,
              selectedTitleList: tabId,
            }))}
          />
          {titleLists}
        </TitleListWrapper>
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
};

const mapState = (state) => ({
  event: state.live.event,
  eventTitleLists: state.live.titleLists,
});

const mapDispatch = (dispatch) => ({
  getEvent: (eventId) => dispatch(actions.getEvent(eventId)),
  getTitleList: (
    { eventId, team }: { eventId?: number, team?: string},
  ) => dispatch(actions.getTitleList({ eventId, team })),
});

export default connect(mapState, mapDispatch)(Live);
