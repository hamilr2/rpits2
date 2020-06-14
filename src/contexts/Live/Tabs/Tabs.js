// @flow
import React from 'react';
import styled from 'styled-components';

const Tab = styled.div`
`;

const TabStrip = styled.div`
`;

type Props = {
  items: any[],
  click: (string) => void,
};

const Tabs = (props: Props) => {
  const { items, click } = props;

  const tabs = items.map((item) => (
    <Tab key={item.id} onClick={() => click(item.id)}>{item.name}</Tab>
  ));

  return (
    <TabStrip>
      { tabs }
    </TabStrip>
  );
};

export default Tabs;
