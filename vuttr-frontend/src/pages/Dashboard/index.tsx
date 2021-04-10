import React, { useState } from 'react';

import ListFavorites from './ListFavorites';
import ListTools from './ListTools';
import { Container, Title, Tabs, Tab } from './styles';

const Dashboard: React.FC = () => {
  const [tab, setTab] = useState('Tools');

  return (
    <Container>
      <Title>
        <h1>VUTTR</h1>
        <h2>Very Useful Tools to Remember</h2>
      </Title>
      <Tabs>
        <Tab selected={tab === 'Tools'} onClick={() => setTab('Tools')}>
          Tools
        </Tab>
        <Tab selected={tab === 'Favorites'} onClick={() => setTab('Favorites')}>
          Favorites
        </Tab>
      </Tabs>
      {tab === 'Tools' ? <ListTools /> : <ListFavorites />}
    </Container>
  );
};

export default Dashboard;
