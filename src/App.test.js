import { render, screen } from '@testing-library/react';
import App from './App';

test('renders join code', () => {
  render(<App />);
  const linkElement = screen.getByText(/Go to/i);
  expect(linkElement).toBeInTheDocument();
});
