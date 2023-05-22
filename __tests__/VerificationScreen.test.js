import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import EmailVerificationScreen from '../screens/EmailVerificationScreen';


describe('EmailVerificationScreen', () => {
  test('renders all components correctly', () => {
    const { getByText, getByPlaceholderText } = render(<EmailVerificationScreen />);

    expect(getByText('Verification code')).toBeTruthy();
    expect(getByText('Enter the confirmation code sent to your mail to complete the verification.')).toBeTruthy();

    const codeInput = getByPlaceholderText('Enter code');
    expect(codeInput).toBeTruthy();

    const verifyButton = getByText('VERIFY');
    expect(verifyButton).toBeTruthy();
  });

  
});