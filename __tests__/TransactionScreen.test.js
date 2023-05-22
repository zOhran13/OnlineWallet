import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import TransactionScreen from "../screens/TransactionScreen";

describe("TransactionScreen", () => {
  test("renders correctly", () => {
    render(<TransactionScreen />);
  });

  test("changes payment type on picker selection", () => {
    const { getByLabelText } = render(<TransactionScreen />);
    const paymentTypePicker = getByLabelText("Payment Type:");
    
    fireEvent(paymentTypePicker, "valueChange", "C2C");
    expect(paymentTypePicker.props.selectedValue).toBe("C2C");
  });

  test("changes currency on picker selection", () => {
    const { getByLabelText } = render(<TransactionScreen />);
    const currencyPicker = getByLabelText("Currency:");
    
    fireEvent(currencyPicker, "valueChange", "$");
    expect(currencyPicker.props.selectedValue).toBe("$");
  });

  test("updates recipient name on text input change", () => {
    const { getByPlaceholderText } = render(<TransactionScreen />);
    const recipientNameInput = getByPlaceholderText("Recipient name");

    fireEvent.changeText(recipientNameInput, "John Doe");
    expect(recipientNameInput.props.value).toBe("John Doe");
  });

  test("updates recipient account number on text input change", () => {
    const { getByPlaceholderText } = render(<TransactionScreen />);
    const recipientAccountNumberInput = getByPlaceholderText("Recipient account number");

    fireEvent.changeText(recipientAccountNumberInput, "123456789");
    expect(recipientAccountNumberInput.props.value).toBe("123456789");
  });

  test("updates description on text input change", () => {
    const { getByPlaceholderText } = render(<TransactionScreen />);
    const descriptionInput = getByPlaceholderText("Description");

    fireEvent.changeText(descriptionInput, "Test description");
    expect(descriptionInput.props.value).toBe("Test description");
  });

  test("changes category on picker selection", () => {
    const { getByLabelText } = render(<TransactionScreen />);
    const categoryPicker = getByLabelText("Category:");

    fireEvent(categoryPicker, "valueChange", "Food and Drink");
    expect(categoryPicker.props.selectedValue).toBe("Food and Drink");
  });

  test("submits transaction on button press", () => {
    const { getByText } = render(<TransactionScreen />);
    const submitButton = getByText("Submit");

    fireEvent.press(submitButton);
    // Add your assertions for the expected behavior
  });
});
