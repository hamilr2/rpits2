// @flow
import axios from '../../api/axios';
import type { Event, TitleList, Title } from '../../coreTypes';
import type { LiveState } from '../reducers/live';

const DB_NAME = 'rpits';

type SetEventAction = {
  type: 'SET_EVENT',
  event: Event,
};

type StoreTitleListAction = {
  type: 'STORE_TITLE_LIST',
  titleList: TitleList,
  id: string,
};

export type Action = SetEventAction | StoreTitleListAction;

type State = {
  live: LiveState,
};

/* eslint-disable no-use-before-define */
type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
type GetState = () => State;
type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
type PromiseAction = Promise<Action>;
/* eslint-enable no-use-before-define */

const setEvent = (eventData: any): SetEventAction => ({
  type: 'SET_EVENT',
  event: eventData,
});

export const getEvent = (eventId: number): ThunkAction => (dispatch: Dispatch) => {
  const sql = `SELECT * FROM events WHERE \`id\` = ${eventId} LIMIT 1`;
  axios.get(`/sql.php?db=${DB_NAME}&sql=${encodeURIComponent(sql)}`)
    .then(({ data }) => {
      const event = data.columns.reduce((obj, col, index) => (
        {
          ...obj,
          [col]: data.rows[0][index],
        }
      ), {});
      dispatch(setEvent(event));
    });
};

type TitleListProps = {
  titleList: Title[],
  id: string,
}

export const storeTitleList = (props: TitleListProps): StoreTitleListAction => ({
  ...props,
  type: 'STORE_TITLE_LIST',
});

export const updateTitleList = (
  { titleList, id }: TitleListProps,
): ThunkAction => (dispatch: Dispatch, getState: GetState) => {
  const updatedTitleList = titleList.map((title, index) => ({
    ...title,
    sort: index,
  }));
  dispatch(storeTitleList({ titleList: updatedTitleList, id }));
  const state = getState();
  if (id === 'main' && state.live.event) {
    const params = new URLSearchParams();
    params.append('saveEvent', `${state.live.event.id}`);
    updatedTitleList.forEach(({ id: titleId, sort }: Title, index) => {
      params.append(`sort[${index}][id]`, titleId);
      params.append(`sort[${index}][sort]`, sort);
    });
    axios.post('/im_title_list.php', params);
  }
};

type getTitleListProps = {
  eventId?: number,
  team?: string,
}

export const getTitleList = (
  { eventId, team }: getTitleListProps,
): ThunkAction => (dispatch: Dispatch) => {
  const params = team ? `team=${team}` : `event=${eventId || ''}`;
  axios.get(`/im_title_list.php?format=json&${params}`)
    .then(({ data }) => {
      dispatch(storeTitleList({ titleList: data, id: team || 'main' }));
    });
};
