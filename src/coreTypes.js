// @flow

declare class process {
  static env: {
    REACT_APP_RPITS_V1_HOST: string,
    REACT_APP_RPITS_V1_DB: string,
  }
}

export type Title = any;

export type Event = {
  id: number,
  name: string,
  team1: string,
  team2: string,
}

export type TitleList = Title[];
