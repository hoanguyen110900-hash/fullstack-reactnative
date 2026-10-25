import {
  render,
  fireEvent,
  waitFor,
  screen,
} from "@testing-library/react-native";
import { describe, it, expect, jest } from "@jest/globals";
import { SignInForm } from "../../src/components/SignIn";

describe("SignInForm", () => {
  it("calls onSubmit with the correct username and password", async () => {
    const onSubmit = jest.fn();

    await render(<SignInForm onSubmit={onSubmit} />);

    await fireEvent.changeText(
      screen.getByPlaceholderText("Enter your username"),
      "testuser",
    );

    await fireEvent.changeText(
      screen.getByPlaceholderText("Enter your password"),
      "testpassword",
    );

    await fireEvent.press(screen.getByText("Sign in"));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();

      expect(onSubmit.mock.calls[0][0]).toEqual({
        username: "testuser",
        password: "testpassword",
      });
    });
  });
});
