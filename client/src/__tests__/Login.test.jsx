import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Login from "../components/Login";
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
  reducer: () => ({ users: { user: null, isSuccess: false, isError: false } }),
});

describe("Login Component", () => {

  test("renders Login UI correctly", () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  test("allows user to type in Email input", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
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
          <Login />
        </BrowserRouter>
      </Provider>
    );

    const passwordInput = screen.getByPlaceholderText("Enter your password");
    fireEvent.change(passwordInput, { target: { value: "123456" } });
    expect(passwordInput.value).toBe("123456");
  });

  test("shows error message when login fails", () => {
    const errorStore = configureStore({
      reducer: () => ({ users: { user: null, isSuccess: false, isError: true } }),
    });

    render(
      <Provider store={errorStore}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Login failed. Please check your credentials.")).toBeInTheDocument();
  });

});





// import React from "react";
// import { render, screen, fireEvent } from "@testing-library/react";
// import { Provider } from "react-redux";
// import { BrowserRouter } from "react-router-dom";
// import configureStore from "redux-mock-store";
// import Login from "../components/Login"

// // Mock store
// const mockStore = configureStore([]);
// let store;

// // Mock navigate
// const mockedUsedNavigate = jest.fn();
// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useNavigate: () => mockedUsedNavigate,
// }));

// describe("Login Component Tests", () => {
//   beforeEach(() => {
//     store = mockStore({
//       users: { user: null, isSuccess: false, isError: false }
//     });
//   });

//   test("renders login form correctly", () => {
//     const { container } = render(
//       <Provider store={store}>
//         <BrowserRouter>
//           <Login />
//         </BrowserRouter>
//       </Provider>
//     );
//     expect(container).toMatchSnapshot();
//   });

//   test("inputs update on typing", () => {
//     render(
//       <Provider store={store}>
//         <BrowserRouter>
//           <Login />
//         </BrowserRouter>
//       </Provider>
//     );

//     const emailInput = screen.getByPlaceholderText("Enter your email");
//     const passwordInput = screen.getByPlaceholderText("Enter your password");

//     fireEvent.change(emailInput, { target: { value: "test@example.com" } });
//     fireEvent.change(passwordInput, { target: { value: "123456" } });

//     expect(emailInput.value).toBe("test@example.com");
//     expect(passwordInput.value).toBe("123456");
//   });

//   test("shows validation errors on empty submit", async () => {
//     render(
//       <Provider store={store}>
//         <BrowserRouter>
//           <Login />
//         </BrowserRouter>
//       </Provider>
//     );

//     const submitBtn = screen.getByRole("button", { name: /sign in/i });
//     fireEvent.click(submitBtn);

//     expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
//     expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
//   });

//   test("dispatches login action on submit with valid data", () => {
//     render(
//       <Provider store={store}>
//         <BrowserRouter>
//           <Login />
//         </BrowserRouter>
//       </Provider>
//     );

//     fireEvent.change(screen.getByPlaceholderText("Enter your email"), { target: { value: "user@test.com" } });
//     fireEvent.change(screen.getByPlaceholderText("Enter your password"), { target: { value: "123456" } });

//     fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

//     const actions = store.getActions();
//     expect(actions.length).toBeGreaterThan(0); // Redux action dispatched
//   });

//   test("navigates to home on success", () => {
//     store = mockStore({
//       users: { user: { email: "user@test.com" }, isSuccess: true, isError: false }
//     });

//     render(
//       <Provider store={store}>
//         <BrowserRouter>
//           <Login />
//         </BrowserRouter>
//       </Provider>
//     );

//     expect(mockedUsedNavigate).toHaveBeenCalledWith("/home");
//   });
// });










