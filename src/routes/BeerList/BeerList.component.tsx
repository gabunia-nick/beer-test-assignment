import React from 'react';
import { useGetRandomBeersQuery } from '../../api/api';
import BeerCard from '../../components/BeerCard';

import './BeerList.style.scss';

const BeerListComponent = () => {
  const { data, error, isLoading } = useGetRandomBeersQuery(30);

  return (
    <main className="BeerList">
      {isLoading && <p className="BeerList-LoadingMessage">Loading...</p>}
      {error && <p className="BeerList-ErrorMessage">Oops... Something went wrong</p>}
      {(!data && !error && !isLoading) && <p className="BeerList-NoResults">Unfortunately no beers were found</p>}
      {data?.map((beer) => (
        <BeerCard key={beer.id} name={beer.name} tagline={beer.tagline} imageUrl={beer.image_url} />
      ))}
    </main>
  );
};

export default BeerListComponent;
