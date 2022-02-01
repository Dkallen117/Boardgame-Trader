import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './pages/Home';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import ListingForm from './components/ListingForm'
import EditListing from './components/EditListing'
import OrderList from './pages/OrderList';
import Setting from './pages/Setting';
import Favorites from './pages/Favorites';
import Messenger from './pages/Messenger';
import Listing from './pages/Listing';
import { WebSocketLink } from "@apollo/client/link/ws";


const webLink = new WebSocketLink({
  uri: `ws://localhost:3000/`,
  options: {
    reconnect: true,
  },
});

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  webLink,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh" style={{ backgroundImage: 'url("https://media.istockphoto.com/vectors/seamless-geometric-style-vector-pattern-design-vector-id1158618406?k=20&m=1158618406&s=612x612&w=0&h=gj225vX8IXjdOwRRa0_CHi1mXxkL3ZSBCQDh4qFgSXI=")'}}>
          <Header />
          <div className="container" style={{ backgroundColor: 'white', boxShadow: "0px 10px 15px", height: '100%' }}>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/orderList">
              <OrderList />
            </Route>
            <Route exact path="/Setting">
              <Setting />
            </Route>
            <Route exact path="/messenger">
              <Messenger />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route exact path="/favorites">
              <Favorites/>
            </Route>
            <Route exact path="/profiles/:profileId">
              <Profile />
            </Route>
            <Route exact path="/new">
              <ListingForm />
            </Route>
            <Route exact path="/listing/:listingId">
              <Listing />
            </Route>
            <Route exact path="/edit/:listingId">
              <EditListing />
            </Route>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
