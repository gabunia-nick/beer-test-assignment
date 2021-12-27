import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { prettyDOM, render, screen, wait } from '@testing-library/react';
import '@testing-library/jest-dom';
import { API_BASE_URL, API_RANDOM_BEER } from '../../api/api.config';
import { Provider } from 'react-redux';
import store from '../../store';
import BeerList from '.';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const server = setupServer(
  rest.get(`${API_BASE_URL}${API_RANDOM_BEER}`, (req, res, ctx) => {
    return res(ctx.json([
        {
          id: Math.floor(Math.random() * 1000000),
          name: 'Imperial Stout',
          tagline: 'The most bitter beer you can eve drink',
          image_url: 'https://image.shutterstock.com/image-photo/beer-600w-617336486.jpg'
        }
    ]))
  })
);

test('BeerList content is being rendered correctly', async () => {
  render(
    <Provider store={store}>
      <BeerList />
    </Provider>
  );

  await wait(() => screen.getAllByTestId('beercard-element'));

  const allCards = screen.getAllByTestId('beercard-element');

  expect(allCards.length).toBe(30);
  expect(prettyDOM(screen.getByTestId('beerlist-element'))).toMatchSnapshot();
});
