import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Header from '.';

test('Header content is being rendered correctly', () => {
  render(<Header />);

  expect(screen.getByText(/Header/i)).toBeInTheDocument();
});
