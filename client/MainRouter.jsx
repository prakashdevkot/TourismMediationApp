import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./core/Home";
import Users from "./user/Users.jsx";
import Signup from "./user/Signup.jsx";
import Signin from "./lib/Signin.jsx";
import Profile from "./user/Profile.jsx";
import PrivateRoute from "./lib/PrivateRoute.jsx";
import EditProfile from "./user/EditProfile.jsx";
import MyServices from "./service/MyServices";
import NewService from "./service/NewService";
import EditService from "./service/EditService";
import NewBooking from "./booking/NewBooking";
import EditBooking from "./booking/EditBooking";
import Menu from "./core/Menu";
function MainRouter() {
  return (
    <div>
      <Menu />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/user/edit/:userId"
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />
        <Route path="/user/:userId" element={<Profile />} />
        <Route
          path="/admin/services"
          element={
            <PrivateRoute>
              <MyServices />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/service/new"
          element={
            <PrivateRoute>
              <NewService />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/service/edit/:serviceId"
          element={
            <PrivateRoute>
              <EditService />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/:serviceId/bookings/new"
          element={
            <PrivateRoute>
              <NewBooking />
            </PrivateRoute>
          }
          component={NewBooking}
        />
        <Route
          path="/admin/:serviceId/:bookingId/edit"
          element={
            <PrivateRoute>
              <EditBooking />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default MainRouter;


