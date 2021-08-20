import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Add Tax title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Add Tax/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders Apply to all items in collection', () => {
  render(<App />);
  const linkElement = screen.getByText(/Apply to all items in collection/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders Apply to all items in collection', () => {
  render(<App />);
  const linkElement = screen.getByText(/Apply to specific items/i);
  expect(linkElement).toBeInTheDocument();
});