// @flow

import React from 'react';
import styled from 'styled-components';

const Base = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ccc;
  background-image: linear-gradient(45deg, #999 25%, transparent 25%, transparent 75%, #999 75%, #999), linear-gradient(45deg, #999 25%, transparent 25%, transparent 75%, #999 75%, #999);
  background-size: 30px 30px;
  background-position: 0 0, 15px 15px;
  position: relative;
`;

const TitleStrip = styled.div`
  position: absolute;
  pointer-events: none;
  top: 0px;
  left: 0px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const TitleSpan = styled.div`
  background-color: rgba(0,0,0,.3);
  padding: 5px;
  flex-basis: 0px;
`;

type Props = {
  title: string,
};

const Monitor = (props: Props) => {
  const { title } = props;
  return (
    <Base>
      <TitleStrip>
        <TitleSpan>{title}</TitleSpan>
      </TitleStrip>
    </Base>
  );
};

export default Monitor;
