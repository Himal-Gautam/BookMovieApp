import React from "react";
import Home from "../screens/home/Home";
import Details from "../screens/details/Details";
import { Routes, Route } from "react-router-dom";
import BookShow from "../screens/bookshow/BookShow";
import Confirmation from "../screens/confirmation/Confirmation";
import Header from "../common/header/Header";

const Controller = () => {
  const baseUrl = "http://localhost:8085/api/v1/";
  //localhost:8085/api/swagger-ui.html#!/movie-controller/getMoviesUsingGET_1

  http: return (
    <div className="main-container">
      <Header baseUrl={baseUrl} />
      <Routes>
        <Route path="/" element={<Home baseUrl={baseUrl} />} />
        <Route path="/movie/:id" element={<Details baseUrl={baseUrl} />} />
        <Route path="/bookshow/:id" element={<BookShow baseUrl={baseUrl} />} />
        <Route
          path="/confirm/:id"
          element={<Confirmation baseUrl={baseUrl} />}
        />

        {/* dont know why below routes were not working */}
        {/* <Route
          exact
          path="/home"
          render={(props) => {
            return <Home {...props} baseUrl={baseUrl} />;
          }}
        /> 
        <Route
          path="/movie/:id"
          render={(props) => <Details {...props} baseUrl={baseUrl} />}
        />
        <Route
          path="/bookshow/:id"
          render={(props) => <BookShow {...props} baseUrl={baseUrl} />}
        />
        <Route
          path="/confirm/:id"
          render={(props) => <Confirmation {...props} baseUrl={baseUrl} />}
        /> */}
      </Routes>
    </div>
  );
};

export default Controller;
