import * as React from "react";
import { Button } from "@mui/material";
import { useQuery } from '@apollo/client';

import GameList from '../components/GameList';

import { QUERY_ME } from '../utils/queries';

const OrderList = () => {
  const { data, loading} = useQuery(QUERY_ME);
  const listings = data?.me?.listings;
  console.log(listings)
  return( 
    <main>
      <h1>My Listings</h1>
      <div>
       {loading ? (
            <h1>Loading...</h1>
          ) : (
            listings.length > 0 ? (
              <GameList listings={listings}/>
            ) : (
              <h4>Looks like nothing is here yet...</h4>
            )
          )}
      </div>
      <Button variant='contained' href={'/new'}>
        Create New
      </Button>      
    </main>
  );
};

export default OrderList;
