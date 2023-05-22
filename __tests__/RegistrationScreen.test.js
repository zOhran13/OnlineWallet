import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RegistrationScreen from '../screens/RegistrationScreen';

describe('RegistrationScreen', () => {
  it('should display error message when registering with blank fields', () => {
    const { getByText, getByPlaceholderText } = render(<RegistrationScreen />);

    fireEvent.press(getByText('REGISTER'));

    const errorMessage = 'All fields are required!';
    expect(getByText(errorMessage)).toBeTruthy();
  });

  it('should display error message when registering with invalid username', () => {
    const { getByText, getByPlaceholderText } = render(<RegistrationScreen />);
    const usernameInput = getByPlaceholderText('Username');

    fireEvent.changeText(usernameInput, 'a');

    fireEvent.press(getByText('REGISTER'));

    const errorMessage = 'Username must have more than 2 letters';
    expect(getByText(errorMessage)).toBeTruthy();
  });

  // Add more test cases for other validation rules and error messages

  it('should navigate to EmailVerification screen when registration is successful', () => {
    const { getByText, getByPlaceholderText } = render(<RegistrationScreen />);
    const registerButton = getByText('REGISTER');
    const usernameInput = getByPlaceholderText('Username');
    const emailInput = getByPlaceholderText('Email');
    // Mock the fetch request to return a successful response

    fireEvent.changeText(usernameInput, 'testuser');
    fireEvent.changeText(emailInput, 'test@example.com');
    // Set values for other input fields

    fireEvent.press(registerButton);

    // Assert that navigation.navigate is called with the correct parameters
    // You may need to mock the navigation prop and use a spy to track the calls
    // to navigation.navigate.
  });
});
