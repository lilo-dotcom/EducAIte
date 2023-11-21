/* eslint-disable testing-library/no-unnecessary-act */
import { render, fireEvent, screen, queryByText, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from 'react';
import Login from "./Login";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { act } from "@testing-library/react";
import { shallow } from "enzyme";
import { Form, Formik } from "formik";


/**
 * @jest-environment jsdom
 */

describe("Login", () => {

  const handleSubmit = jest.fn();

  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login />}/>
      </Routes>
      </BrowserRouter>
    
    );
  })

  it("should login on submit", async () => {
    const email = screen.getByPlaceholderText("Enter email");
    const password = screen.getByPlaceholderText("Enter password");

    act(() => {
      userEvent.type(email, "test@gmail.com");
    });

    act(() => {
      userEvent.type(password, "1234Test");
    });

    act(() => {
      console.log(screen.getAllByText("Log In")[1]);
      userEvent.click(screen.getAllByText("Log In")[1]);
    });
    

    await waitFor(() => {
      expect(handleSubmit).toBeCalledTimes(1);
    });
    
  })

})