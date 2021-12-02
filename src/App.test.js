import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('<App>', () => {
  it('renders form', () => {
    render(
      <App />
    );

    expect(screen.getByTestId("currency-widget")).toBeInTheDocument();
  });
});