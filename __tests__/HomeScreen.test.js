import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../screens/HomeScreen';

describe('HomeScreen', () => {
  test('renders correctly', () => {
    const { getByText } = render(<HomeScreen />);
    
    // Check if the "PAY" button is rendered
    const payButton = getByText('PAY');
    expect(payButton).toBeTruthy();
  });

  test('navigates to "Transaction" screen when "PAY" button is pressed', () => {
    const navigationMock = { navigate: jest.fn() };
    const { getByText } = render(<HomeScreen navigation={navigationMock} />);
    
    // Press the "PAY" button
    const payButton = getByText('PAY');
    fireEvent.press(payButton);
    
    // Check if the navigation function is called with the correct screen name
    expect(navigationMock.navigate).toHaveBeenCalledWith('Transaction');
  });

  test('navigates to "Template List" screen when "Template list" button is pressed', () => {
    const navigationMock = { navigate: jest.fn() };
    const { getByText } = render(<HomeScreen navigation={navigationMock} />);
    
    // Press the "Template list" button
    const templateListButton = getByText('Template list');
    fireEvent.press(templateListButton);
    
    // Check if the navigation function is called with the correct screen name
    expect(navigationMock.navigate).toHaveBeenCalledWith('Template List');
  });

  // Add more tests for other UI interactions and navigation scenarios

});
