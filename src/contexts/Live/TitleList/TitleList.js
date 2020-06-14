// @flow

import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { DragDropContext, Droppable, type DropResult } from 'react-beautiful-dnd';
import arrayMove from 'array-move';
import type { Title } from '../../../coreTypes';
import TitleListItem from './TitleListItem/TitleListItem';
import * as actions from '../../../store/actions/live';

const List = styled.div`
  user-select: none;
`;

type Props = {
  id: string,
  active: boolean,
  titles: Title[],
  updateTitleList: ({
    titleList: Title[],
    id: string,
  }) => void,
}

const TitleList = ({ active, id, titles = [], updateTitleList }: Props) => {
  const onDragEnd = (result: DropResult) => {
    if (result.destination) {
      const { source: { index: oldIndex }, destination: { index: newIndex } } = result;
      // const oldIndex = result.source.index;
      // const newIndex = result.destination ? result.destination.index : -1;
      updateTitleList({
        titleList: arrayMove(titles, oldIndex, newIndex),
        id,
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: active ? 'initial' : 'none' }}>
        <Droppable droppableId={id}>
          {(provided) => (
            <List
              ref={provided.innerRef}
              /* eslint-disable react/jsx-props-no-spreading */
              {...provided.droppableProps}
              /* eslint-enable react/jsx-props-no-spreading */
            >
              { titles.map((title: Title, index) => (
                <TitleListItem title={title} selected={index === 2} index={index} key={`${title.type}${title.id}`} />
              )) }
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

const mapDispatch = (dispatch) => ({
  updateTitleList: ({ titleList, id }) => dispatch(actions.updateTitleList({
    titleList,
    id,
  })),
});

export default connect(null, mapDispatch)(TitleList);
