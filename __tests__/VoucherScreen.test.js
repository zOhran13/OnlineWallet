import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ToastAndroid } from 'react-native'; // Import ToastAndroid from react-native

import VoucherReedemScreen from '../screens/VoucherReedemScreen.js';
import { setItemAsync, getItemAsync, deleteItemAsync } from '../__mocks__/expo-secure-store.js';

jest.mock('react-native/Libraries/Components/ToastAndroid/ToastAndroid', () => {
  // Mock the show method
  return {
    show: jest.fn(),
  };
});

describe('VoucherReedemScreen', () => {
  it('displays "Invalid voucher format" toast when voucher format is invalid', () => {
    const { getByPlaceholderText, getByText } = render(<VoucherReedemScreen />);
    const voucherInput = getByPlaceholderText('XXXX-XXXX-XXXX-XXXX');

    fireEvent.changeText(voucherInput, '123-4a5a-45555-aaaa');
    const redeemButton = getByText('Reedem');
    fireEvent.press(redeemButton);

    expect(ToastAndroid.show).toHaveBeenCalledWith(
      'Invalid voucher format',
      ToastAndroid.SHORT
    );
  });

});
