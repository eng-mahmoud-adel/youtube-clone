import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import HomeScreen from './components/screens/homeScreen/HomeScreen';
import LoginScreen from './components/screens/loginScreen/LoginScreen';
import WatchScreen from './components/screens/watchScreen/WatchScreen';

import { useSelector } from 'react-redux';

import './_app.scss';
import SearchScreen from './components/screens/searchScreen/SearchScreen';
import SubscriptionsScreen from './components/screens/subscriptionsScreen/SubscriptionsScreen';
import ChannelScreen from './components/screens/channelScreen/ChannelScreen';

function Layout({ children }) {
  const [sidebar, toggleSidebar] = useState(false);

  const handleToggleSidebar = () => toggleSidebar(value => !value);

  return (
    <>
      <Header handleToggleSidebar={handleToggleSidebar} />
      <div className="app_container">
        <Sidebar sidebar={sidebar} handleToggleSidebar={handleToggleSidebar} />

        <Container fluid className="app_main">
          {children}
        </Container>
      </div>
    </>
  );
}


function App() {
  const history = useHistory();
  const {accessToken, loading} = useSelector(state => state.auth);

  useEffect(() => {
    if(!loading && !accessToken) {
      history.push('/auth');
    }
  }, [accessToken, loading, history]);

  return (
      <Switch>
        <Route exact path="/">
          <Layout>
            <HomeScreen />
          </Layout>
        </Route>

        <Route path="/auth">
          <LoginScreen />
        </Route>

        <Route path="/search/:query">
          <Layout>
            <SearchScreen />
          </Layout>
        </Route>

        <Route path="/watch/:id">
          <Layout>
            <WatchScreen />
          </Layout>
        </Route>

        <Route path="/feed/subscriptions">
          <Layout>
            <SubscriptionsScreen />
          </Layout>
        </Route>

        <Route path="/channel/:channelId">
          <Layout>
            <ChannelScreen />
          </Layout>
        </Route>

        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>      
  );
}

export default App;
