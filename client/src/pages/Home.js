import React from 'react';
import { useQuery } from '@apollo/client';
import GameList from '../components/GameList';
import { QUERY_ALL_LISTINGS } from '../utils/queries';
import Box from '@mui/material/Box';

const Home = () => {
const { data, loading } = useQuery(QUERY_ALL_LISTINGS);
const listings = data?.listings || [];
console.log(data?.listings.id);
  return( 
    <main  > 
      <div className="flex-row justify-center">
       {loading ? (
            <h1>Loading...</h1>
          ) : (
            <Box>
            <GameList
            listings = {listings}
            />
            </Box>
            )}
            </div>       
  </main>
 );        
}

export default Home;
