import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL, API_RANDOM_BEER } from './api.config';
import { BeerResponse } from './types/BeerResponse.type';

export const beerApi = createApi({
  reducerPath: 'beerReducer',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    /**
     * Query to retrieve random beers by number
     */
    getRandomBeers: builder.query<BeerResponse[], number>({
      async queryFn(beerNumber, _api, _extraOptions, fetchWithBQ) {
        /**
         * A reccursive function to retrieve exact number of random beers
         * As beers are returned by random, repetitions must be excpected
         * To prevent a repetitions in a final result, this functions is called
         * Reccursivly and fetches number of beers required to fill the expected result
         * Until there is number of unique beers equal to the required value
         * @param {number} number Number of beers that are needed to be retrieved
         * @param {BeerResponse[]} resArr An array to store random beers
         * @param {Ser<number>} set A set which contains already retrieved beer ids
         * @returns {Promise<{ data: BeerResponse[] } | { error: FetchBaseQueryError }>}
         */
        const fetchBeersRecc = async (number: number, resArr: BeerResponse[], set: Set<number>)
        : Promise<{ data: BeerResponse[] } | { error: FetchBaseQueryError }> => {
          if (number <= 0) {
            return { data: resArr };
          }

          const requestPromiseArray = Array(number).fill(null)
            .map(() => fetchWithBQ(API_RANDOM_BEER));

          try {
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
          } catch (_) {
            return { error: { status: 'CUSTOM_ERROR', error: 'Something went wrong' } };
          }
        };

        const beerSet = new Set<number>();

        return fetchBeersRecc(beerNumber, [], beerSet);
      },
    }),
  }),
});

export const { useGetRandomBeersQuery } = beerApi;
