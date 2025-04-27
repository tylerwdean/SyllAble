import React from "react";
import axios from "axios";
import { useAuth } from "../../Contexts/AuthContext";

const getSyllabi = async () => {
  axios.get("/api/syllabus").then((res) => {
    return res.json;
  });
};

const addSyllabus = () => {
  return (
    <div
      className="card"
      style={{ width: "200px", height: "200px" }}
      onClick={() => console.log("clicked")}
    >
      <div className="card-body">
        <h5 className="card-title" style={{ textAlign: "center" }}>
          Create new Syllabus
        </h5>
      </div>
    </div>
  );
};

const displaySyllabus = (syllabus) => {
  return (
    <div
      className="card"
      style={{ width: "200px", height: "200px" }}
      onClick={() => console.log("clicked")}
    >
      <div className="card-body">
        <h5 className="card-title" style={{ textAlign: "center" }}>
          Programming Languages - A
        </h5>
        <p className="card-text text-center">CSC-330A</p>
        <p className="card-text text-center">FALL '25</p>
      </div>
    </div>
  );
};

const Home = () => {
  const { firstName } = useAuth();

  return (
    <>
      <div className="container">
        <h2 className="my-5">Welcome, {firstName}</h2>
        <div className="row gap-3 mx-0">
          {addSyllabus()}
          {displaySyllabus()}
          {displaySyllabus()}
          {displaySyllabus()}
          {displaySyllabus()}
          {displaySyllabus()}
          {displaySyllabus()}
        </div>
      </div>
    </>
  );
};

export default Home;
