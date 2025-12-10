import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Register from "../components/Register";
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

describe("Register Component", () => {
  test("matches snapshot", () => {
    const { asFragment } = renderWithProviders(<Register />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("renders all input fields", () => {
    renderWithProviders(<Register />);
    expect(screen.getByPlaceholderText(/enter your name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your password/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your location/i)).toBeInTheDocument();
  });

  test("shows validation errors on empty submit", async () => {
    renderWithProviders(<Register />);
    const button = screen.getByRole("button", { name: /sign up/i });
    await userEvent.click(button);

    expect(await screen.findByText(/username is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/location is required/i)).toBeInTheDocument();
  });

  test("allows typing into inputs", async () => {
    renderWithProviders(<Register />);
    const nameInput = screen.getByPlaceholderText(/enter your name/i);
    const emailInput = screen.getByPlaceholderText(/enter your email/i);
    const passwordInput = screen.getByPlaceholderText(/enter your password/i);
    const locationInput = screen.getByPlaceholderText(/enter your location/i);

    await userEvent.type(nameInput, "Abdullah");
    await userEvent.type(emailInput, "abdullah@example.com");
    await userEvent.type(passwordInput, "securePass123");
    await userEvent.type(locationInput, "Muscat");

    expect(nameInput).toHaveValue("Abdullah");
    expect(emailInput).toHaveValue("abdullah@example.com");
    expect(passwordInput).toHaveValue("securePass123");
    expect(locationInput).toHaveValue("Muscat");
  });
});
