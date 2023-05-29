import React, { useState, useEffect } from "react";
import { getVendors } from "../modules/vendorsModule";
import { getEInvoiceRequiredData, registerNewEInvoice } from "../modules/einvoiceModule";
import { render, fireEvent, act } from "@testing-library/react-native";
import EInvoiceRegistrationScreen from "../screens/EInvoiceRegistrationScreen";

jest.mock("../modules/vendorsModule");
jest.mock("../modules/einvoiceModule");

describe("EInvoiceRegistrationScreen", () => {
  beforeEach(() => {
    getVendors.mockResolvedValue([
      { name: "Company 1" },
      { name: "Company 2" },
      { name: "Company 3" },
    ]);
    getEInvoiceRequiredData.mockResolvedValue({
      field1: "Field 1",
      field2: "Field 2",
      field3: "Field 3",
      field4: "Field 4",
    });
  });

  it("should render the screen without errors", async () => {
    render(<EInvoiceRegistrationScreen />);
  });

});
