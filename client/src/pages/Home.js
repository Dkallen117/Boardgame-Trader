import React from 'react';
import { useQuery } from '@apollo/client';
import GameList from '../components/GameList';
import { QUERY_ALL_LISTINGS } from '../utils/queries';

const Home = () => {
const { data, loading } = useQuery(QUERY_ALL_LISTINGS);
const listings = data?.listings || [];

  return( 
    <main> 
      <div>
       {loading ? (
            <h1>Loading...</h1>
          ) : (
            <GameList
            listings = {listings}
            />
            )}
            </div>       
  </main>
 );        
}

export default Home;
