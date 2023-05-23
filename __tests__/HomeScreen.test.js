/* import React from 'react';
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
 */

import 'react-native';
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../screens/HomeScreen';

jest.mock('react-navigation', () => ({
  NavigationActions: {
    navigate: jest.fn(),
    reset: jest.fn(),
  },
}));
jest.mock('../modules/userModule', () => ({
  getUserDetails: jest.fn().mockResolvedValue({ firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', phoneNumber: '1234567890' }),
  logout: jest.fn(),
}));
jest.mock('../modules/transactionModule', () => ({
  getAccounts: jest.fn().mockResolvedValue([
    { id: 1, accountNumber: '123456789', currency: 'USD', bankName: 'Bank A', description: 'Account A', total: 1000.0 },
    { id: 2, accountNumber: '987654321', currency: 'EUR', bankName: 'Bank B', description: 'Account B', total: 2000.0 },
  ]),
}));
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useIsFocused: jest.fn().mockReturnValue(true),
}));

describe('HomeScreen', () => {
  it('renders correctly', async () => {
    const { getByText, findByText } = render(<HomeScreen navigation={{ navigate: jest.fn(), reset: jest.fn() }} />);

    // Wait for async functions to resolve
    await Promise.resolve();

    // Check if user details are rendered correctly
    expect(await findByText('J')).toBeTruthy();
    expect(await findByText('John Doe')).toBeTruthy();
    expect(await findByText('john.doe@example.com')).toBeTruthy();
    expect(await findByText('1234567890')).toBeTruthy();

    // Check if account details are rendered correctly
    expect(await findByText('123456789 USD')).toBeTruthy();
    expect(await findByText('Bank A')).toBeTruthy();
    expect(await findByText('Account A...')).toBeTruthy();
    expect(await findByText('1000.00 USD')).toBeTruthy();

    expect(await findByText('987654321 EUR')).toBeTruthy();
    expect(await findByText('Bank B')).toBeTruthy();
    expect(await findByText('Account B...')).toBeTruthy();
    expect(await findByText('2000.00 EUR')).toBeTruthy();
  });
});

