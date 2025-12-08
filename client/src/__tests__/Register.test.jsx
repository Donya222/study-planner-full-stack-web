import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Register from "../components/Register";
import { configureStore } from "@reduxjs/toolkit";
import { vi } from "vitest";

// Mock navigate
const mockedUsedNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

// Mock store
const store = configureStore({
  reducer: () => ({ users: { message: '' } }),
});

describe("Register Component", () => {

  test("renders Register UI correctly", () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  test("allows user to type in Name input", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      </Provider>
    );

    const nameInput = screen.getByPlaceholderText("Enter your name");
    fireEvent.change(nameInput, { target: { value: "Abdullah" } });
    expect(nameInput.value).toBe("Abdullah");
  });

  test("allows user to type in Email input", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      </Provider>
    );

    const emailInput = screen.getByPlaceholderText("Enter your email");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    expect(emailInput.value).toBe("test@example.com");
  });

  test("allows user to type in Password input", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      </Provider>
    );

    const passwordInput = screen.getByPlaceholderText("Enter your password");
    fireEvent.change(passwordInput, { target: { value: "123456" } });
    expect(passwordInput.value).toBe("123456");
  });
});










// import React from "react";
// import { render, screen, fireEvent } from "@testing-library/react";
// import { Provider } from "react-redux";
// import { BrowserRouter } from "react-router-dom";
// import configureStore from "redux-mock-store";
// import Register from "../components/Register"

// // Mock store
// const mockStore = configureStore([]);
// let store;

// // Mock navigate
// const mockedUsedNavigate = jest.fn();
// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useNavigate: () => mockedUsedNavigate,
// }));

// describe("Register Component Tests", () => {
//   beforeEach(() => {
//     store = mockStore({
//       users: { message: "" }
//     });
//   });

//   test("renders registration form correctly", () => {
//     const { container } = render(
//       <Provider store={store}>
//         <BrowserRouter>
//           <Register />
//         </BrowserRouter>
//       </Provider>
//     );
//     expect(container).toMatchSnapshot();
//   });

//   test("inputs update on typing", () => {
//     render(
//       <Provider store={store}>
//         <BrowserRouter>
//           <Register />
//         </BrowserRouter>
//       </Provider>
//     );

//     const nameInput = screen.getByPlaceholderText("Enter your name");
//     const emailInput = screen.getByPlaceholderText("Enter your email");
//     const passwordInput = screen.getByPlaceholderText("Enter your password");
//     const locationInput = screen.getByPlaceholderText("Enter your location");

//     fireEvent.change(nameInput, { target: { value: "John" } });
//     fireEvent.change(emailInput, { target: { value: "john@example.com" } });
//     fireEvent.change(passwordInput, { target: { value: "123456" } });
//     fireEvent.change(locationInput, { target: { value: "Oman" } });

//     expect(nameInput.value).toBe("John");
//     expect(emailInput.value).toBe("john@example.com");
//     expect(passwordInput.value).toBe("123456");
//     expect(locationInput.value).toBe("Oman");
//   });

//   test("shows validation errors on empty submit", async () => {
//     render(
//       <Provider store={store}>
//         <BrowserRouter>
//           <Register />
//         </BrowserRouter>
//       </Provider>
//     );

//     const submitBtn = screen.getByRole("button", { name: /sign up/i });
//     fireEvent.click(submitBtn);

//     expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
//     expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
//     expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
//     expect(await screen.findByText(/location is required/i)).toBeInTheDocument();
//   });

//   test("dispatches register action on submit with valid data", () => {
//     render(
//       <Provider store={store}>
//         <BrowserRouter>
//           <Register />
//         </BrowserRouter>
//       </Provider>
//     );

//     fireEvent.change(screen.getByPlaceholderText("Enter your name"), { target: { value: "John" } });
//     fireEvent.change(screen.getByPlaceholderText("Enter your email"), { target: { value: "john@example.com" } });
//     fireEvent.change(screen.getByPlaceholderText("Enter your password"), { target: { value: "123456" } });
//     fireEvent.change(screen.getByPlaceholderText("Enter your location"), { target: { value: "Oman" } });

//     fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

//     const actions = store.getActions();
//     expect(actions.length).toBeGreaterThan(0); // Redux action dispatched
//   });

//   test("navigates to home after successful registration", () => {
//     store = mockStore({
//       users: { message: "", user: { email: "john@example.com" } }
//     });

//     render(
//       <Provider store={store}>
//         <BrowserRouter>
//           <Register />
//         </BrowserRouter>
//       </Provider>
//     );

//     fireEvent.click(screen.getByRole("button", { name: /sign up/i }));
//     expect(mockedUsedNavigate).toHaveBeenCalled();
//   });
// });




