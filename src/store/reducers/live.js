// @flow

import type { Action } from '../actions/live';
import type { Event, TitleList } from '../../coreTypes';

const initialState = {
  event: null,
  titleLists: {},
};

export type LiveState = {
  +event: ?Event,
  +titleLists: {
    +[key: string]: TitleList,
  },
};

const liveReducer = (state: LiveState = initialState, action: Action) => {
  switch (action.type) {
    case 'SET_EVENT':
      return {
        ...state,
        event: action.event,
      };
    case 'STORE_TITLE_LIST':
      return {
        ...state,
        titleLists: {
          ...state.titleLists,
          [action.id]: action.titleList,
        },
      };
    default:
      return state;
  }
};

export default liveReducer;
