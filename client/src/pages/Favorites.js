import * as React from "react";
import { Button } from "@mui/material";
import { useQuery } from '@apollo/client';

import GameList from '../components/GameList';

import { QUERY_ME } from '../utils/queries';

const Favorites = () => {
  const { data, loading} = useQuery(QUERY_ME);
  const listings = data?.me?.favorites;
  console.log(listings)
  return( 
    <main>
      <h1>Saved Listings</h1>
      <div>
       {loading ? (
            <h1>Loading...</h1>
          ) : (
            listings.length > 0 ? (
              <GameList listings={listings}/>
            ) : (
              <h4>Looks you haven't saved anything yet...</h4>
            )
          )}
      </div>
      <Button variant='contained' href={'/'}>
        Search for games!
      </Button>      
    </main>
  );
};

export default Favorites;