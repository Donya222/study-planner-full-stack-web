import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Login from "../components/Login";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/UserSlice";


const mockStore = configureStore({
  reducer: {
    users: userReducer,
  },
  preloadedState: {
    users: {
      user: null,
      isSuccess: false,
      isError: false,
      isLoading: false,
    },
  },
});

// Helper function to render with provider
const renderWithProviders = (ui, store = mockStore) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>{ui}</BrowserRouter>
    </Provider>
  );
};

describe("Login Component", () => {
  test("Match the Login UI snapshot", () => {
    const { asFragment } = renderWithProviders(<Login />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("renders email and password inputs", () => {
    renderWithProviders(<Login />);
    expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your password/i)).toBeInTheDocument();
  });

  test("shows validation errors on empty submit", async () => {
    renderWithProviders(<Login />);
    const button = screen.getByRole("button", { name: /sign in/i });
    await userEvent.click(button);

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
  });

  test("allows typing into email and password fields", async () => {
    renderWithProviders(<Login />);
    const emailInput = screen.getByPlaceholderText(/enter your email/i);
    const passwordInput = screen.getByPlaceholderText(/enter your password/i);

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "password123");

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("password123");
  });
});
