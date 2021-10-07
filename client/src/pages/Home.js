import * as React from 'react';
import { useQuery } from '@apollo/client';

import GameList from '../components/GameList';

import { QUERY_ALL_LISTINGS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_ALL_LISTINGS);
  const listings = data?.listings || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <GameList
              listings ={listings}
              title="Here's the current roster of friends..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
