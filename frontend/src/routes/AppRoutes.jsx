import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Home from "../components/home/Home";
import Login from "../components/login/Login";
import SignUp from "../components/signUp/SignUp";
import MyOrders from "../components/myOrder/MyOrders";
import Checkout from "../components/checkout/Checkout";
import MyProfile from "../components/myProfile/MyProfile";
import AddressForm from "../components/addressForm/AddressForm";
import { PrivateRoutes } from "./PrivateRoutes";
import withLoading from "../components/loader/loading";

const HomeWithLoading = withLoading(Home);
const MyOrdersWithLoading = withLoading(MyOrders);
const CheckoutWithLoading = withLoading(Checkout);
const MyProfileWithLoading = withLoading(MyProfile);
const AddressFormWithLoading = withLoading(AddressForm);

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeWithLoading />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/myOrders" element={<MyOrdersWithLoading />} />
          <Route path="/checkout" element={<CheckoutWithLoading />} />
          <Route path="/myProfile" element={<MyProfileWithLoading />} />
          <Route path="/editAddress" element={<AddressFormWithLoading />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignUp />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}
