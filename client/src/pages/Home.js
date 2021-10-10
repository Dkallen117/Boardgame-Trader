import * as React from 'react';
import { useQuery } from '@apollo/client';

import GameList from '../components/GameList';

 import listings from './listingSeeds.json'

import { QUERY_ALL_LISTINGS } from '../utils/queries';

// const { loading, data } = useQuery(QUERY_ALL_LISTINGS);
// const listings = data?.listings || [];

class Home extends React.Component  {
  constructor(props) {
    super(props);
    this.state = {
      listings
    };
  }
 
  render() {
    return(  
           this.state.listings.map(listings => {
           return( 
           <main> <div className="col-12 col-md-10 my-3">
           <GameList
             title = {listings.title}
             description = {listings.description}
             price = {listings.price}
             quantity = {listings.quantity}
             genre = {listings.genre}
           />
          </div>          
          </main>);
        })
        )}
      }
export default Home;
