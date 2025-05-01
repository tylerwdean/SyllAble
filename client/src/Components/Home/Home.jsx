import React, { useEffect } from "react";
import api from "../../api";
import { useAuth } from "../../Contexts/AuthContext";

const getSyllabi = async () => {
  try {
    const res = await api.get("/syllabus");
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const addSyllabus = () => {
  return (
    <div
      className="card"
      style={{ width: "200px", height: "200px" }}
      onClick={() => (window.location.href = "/create-syllabus")}
    >
      <div className="card-body">
        <h5 className="card-title" style={{ textAlign: "center" }}>
          Create new Syllabus
        </h5>
      </div>
    </div>
  );
};

const displaySyllabus = (syllabus, index) => {
  return (
    <div
      key={index}
      className="card"
      style={{ width: "200px", height: "200px" }}
      onClick={() => {
        localStorage.setItem("current_syllabus", syllabus.id);
        window.location.href = "/edit";
      }}
    >
      <div className="card-body">
        <h5 className="card-title" style={{ textAlign: "center" }}>
          {syllabus.title}
        </h5>
        <p className="card-text text-center">{syllabus.course_code}</p>
        <p className="card-text text-center">{syllabus.semester}</p>
      </div>
    </div>
  );
};

const Home = () => {
  const { firstName, isReady } = useAuth();
  const [syllabi, setSyllabi] = React.useState([]);

  useEffect(() => {
    if (!isReady) return;
    const asyncFunction = async () => {
      const result = await getSyllabi();
      if (result) setSyllabi(result);
    };
    asyncFunction();
  }, [isReady]);
  return (
    <>
      <div className="container">
        <h2 className="my-5">Welcome, {firstName}</h2>
        <div className="row gap-3 mx-0">
          {addSyllabus()}
          {syllabi.map((syllabus, index) => displaySyllabus(syllabus, index))}
        </div>
      </div>
    </>
  );
};

export default Home;
