import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import BeerCard from '.';

test('BeerCard content is being rendered correctly', () => {
  render(
    <BeerCard
      name="Imperial Stout"
      tagline="The beer you will never forget"
      imageUrl="https://image.shutterstock.com/image-photo/beer-600w-617336486.jpg"
    />
  );

  const image = screen.getByAltText(/Imperial Stout/i);

  expect(screen.getByText(/Imperial Stout/i)).toBeInTheDocument();
  expect(screen.getByText(/The beer you will never forget/i)).toBeInTheDocument();
  expect(image).toHaveAttribute('src', 'https://image.shutterstock.com/image-photo/beer-600w-617336486.jpg');
});
