import { render, screen } from '@testing-library/react';
<<<<<<< HEAD

import App from './App.js';

=======
import App from './App';
>>>>>>> 정세인

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
