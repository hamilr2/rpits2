// @flow

import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import type { Title } from '../../../../coreTypes';

const TitleRow = styled.div`
  font-size: 24px;
  width: 100%;
  line-height: 32px;
  box-sizing: border-box;
  height: 41px;
  padding-left: 92px;
  position: relative;
  font-family: sans-serif;

  border-style: solid;
  border-width: 4px;
  border-left-style: none;
  border-right-style: none;
  border-bottom-width: ${(props) => (props.selected ? '4px' : '1px')};
  border-color: ${(props) => (props.selected ? '#aaaaff !important' : 'transparent')};
  border-bottom-color: black;

  :active {
    border-bottom-width: 4px;
    border-color: #ffaaaa;
  }
`;

const Thumbnail = styled.img`
  height: 40px;
  width: 72px;
  left: 10px;
  top: -3px;
  position: absolute;
`;

const TitleName = styled.span`
`;

type Props = {
  title: Title,
  selected: boolean,
  index: number,
}

const getFilename = (title: Title): string => {
  if (title.type === 'player') {
    return `${title.num}${title.first}${title.last}.png`;
  }
  return `${title.name}${title.id}.png`;
};

const getDisplayName = (title: Title): string => {
  if (title.type === 'player') {
    return `${title.num} - ${title.first} ${title.last}`;
  }
  return title.name;
};

const TitleListItem = ({ index, title, selected }: Props) => (
  <Draggable draggableId={title.id} index={index}>
    {(provided) => (
      <TitleRow
        selected={selected}
        /* eslint-disable react/jsx-props-no-spreading */
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        /* eslint-enable react/jsx-props-no-spreading */
        ref={provided.innerRef}
      >
        <Thumbnail src={`http://127.0.0.1/rpits/thumbs/${getFilename(title)}`} />
        <TitleName>{getDisplayName(title)}</TitleName>
      </TitleRow>
    )}
  </Draggable>
);

export default TitleListItem;
