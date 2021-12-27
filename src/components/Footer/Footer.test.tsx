import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Footer from '.';

test('Footer content is being rendered correctly', () => {
  render(<Footer />);

  expect(screen.getByText(/Footer/i)).toBeInTheDocument();
});
