import React from 'react';
import { render, screen } from '@testing-library/react';
import StudentsDashboard from './Views/students/StudentsDashboard';

test('Students Dashboard Testing', () => {
  render(<StudentsDashboard />);
  const linkElement = screen.getByText(/las mejores rutas/i);
  expect(linkElement).toBeInTheDocument();
});
