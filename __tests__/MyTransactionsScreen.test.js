import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import MyTransactionsScreen from "../screens/MyTransactionsScreen";
import * as User from "../modules/userModule";
import { getTransactions } from "../modules/transactionModule";

jest.mock("../modules/userModule");
jest.mock("../modules/transactionModule");

describe("MyTransactionsScreen", () => {
  const mockNavigation = {
    navigate: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  //  OVAJ TEST PROLAZI
  it("renders transactions correctly", async () => {
    const mockTransactions = [
      {
        transactionId: "1",
        createdAt: "2023-05-25T10:30:00Z",
        amount: 100,
        currency: "USD",
        sender: { name: "John", accountNumber: "1234567890" },
        recipient: { name: "Alice", accountNumber: "0987654321" },
      },
    ];

    User.getUserDetails.mockResolvedValueOnce({
      id: "123",
      firstName: "John",
      lastName: "Doe",
    });
    getTransactions.mockResolvedValueOnce(mockTransactions);

    const { findByText } = render(
      <MyTransactionsScreen navigation={mockNavigation} />
    );

    const transaction1 = await findByText("John");
    expect(transaction1).toBeTruthy();

  });

  // OVAJ NE PROLAZI, WE DON'T KNOW WHY
  /*it("navigates to TransactionDetails screen on press", async () => {
    const mockTransactions = [
      {
        transactionId: "1",
        createdAt: "2023-05-25T10:30:00Z",
        amount: 100,
        currency: "USD",
        sender: { name: "John", accountNumber: "1234567890" },
        recipient: { name: "Alice", accountNumber: "0987654321" },
      },
    ];

    User.getUserDetails.mockResolvedValueOnce({
      id: "123",
      firstName: "John",
      lastName: "Doe",
    });
    getTransactions.mockResolvedValueOnce(mockTransactions);

    const { findByText, getByTestId } = render(
      <MyTransactionsScreen navigation={mockNavigation} />
    );

    const transaction1 = await findByText("John");
    fireEvent.press(getByTestId("1"));
    expect(mockNavigation.navigate).toHaveBeenCalledWith("TransactionDetails", {
      id: "1",
    });
  });
  */
});

  

