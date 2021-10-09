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
import Hello from './pages/Hello';
import OrderList from './pages/OrderList';
import Setting from './pages/Setting';
import Purchased from './pages/Purchased';
import Message from './pages/Message';
import Messenger from './components/Messenger';
import Listing from './pages/Listing';

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
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
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
            <Route exact path="/message">
              <Message />
            </Route>
            <Route exact path="/profile">
              <Hello />
            </Route>
            <Route exact path="/purchased">
              <Purchased/>
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
            <Route exact path="/message">
              <Messenger />
            </Route>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
