import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import TemplateListScreen from "../screens/TemplateListScreen";
import * as UserModule from "../modules/userModule";
import * as TemplatesModule from "../modules/templatesModule";

jest.mock("../modules/userModule");
jest.mock("../modules/templatesModule");

describe("TemplateListScreen", () => {
  const mockNavigation = {
    navigate: jest.fn(),
  };
  const backAction = (navigation) => {
    navigation.navigate("Home");
    return true;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders template with expected name", async () => {
    const mockTemplates = [
      {
        id: "1",
        title: "Sample Template",
        received: "false",
      },
    ];

    UserModule.getUserDetails.mockResolvedValueOnce({ id: "123" });
    TemplatesModule.getTemplates.mockResolvedValueOnce(mockTemplates);

    const { findByText } = render(
      <TemplateListScreen navigation={mockNavigation} />
    );

    const template = await findByText("Sample Template");
    expect(template).toBeTruthy();
  });

  it("navigates to Home and returns true", async () => {
    const result = await backAction(mockNavigation);

    expect(mockNavigation.navigate).toHaveBeenCalledWith("Home");
    expect(result).toBe(true);
  });

  it("navigates to Transaction screen with correct id", () => {
    const mockId = "123";

    const handlePress = (id, navigation) => {
      navigation.navigate("Transaction", { id });
    };

    handlePress(mockId, mockNavigation);

    expect(mockNavigation.navigate).toHaveBeenCalledWith("Transaction", {
      id: mockId,
    });
  });
});