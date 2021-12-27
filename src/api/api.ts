import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL, API_RANDOM_BEER } from './api.config';
import { BeerResponse } from './types/BeerResponse.type';

export const beerApi = createApi({
  reducerPath: 'beerReducer',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    getRandomBeers: builder.query<BeerResponse[], number>({
      async queryFn(beerNumber, _api, _extraOptions, fetchWithBQ) {
        const fetchBeersRecc = async (number: number, resArr: BeerResponse[], set: Set<number>)
        : Promise<BeerResponse[]> => {
          if (number <= 0) {
            return resArr;
          }

          const requestPromiseArray = Array(number).fill(null)
            .map(() => fetchWithBQ(API_RANDOM_BEER));
          const result = await Promise.all(requestPromiseArray);

          const newResArr = result.reduce((acc, curr) => {
            const { data } = curr;
            const [beer] = data as BeerResponse[] || [];

            if (!beer) {
              return acc;
            }

            if (set.has(beer.id)) {
              return acc;
            }

            set.add(beer.id);
            return [...acc, beer];
          }, resArr);

          return fetchBeersRecc(number - newResArr.length, newResArr, set);
        };

        const beerSet = new Set<number>();

        return { data: await fetchBeersRecc(beerNumber, [], beerSet) };
      },
    }),
  }),
});

export const { useGetRandomBeersQuery } = beerApi;
