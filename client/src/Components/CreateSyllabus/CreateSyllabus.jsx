import React from "react";
import CreationDropdown from "../CreationDropdown/CreationDropdown";
import api from "../../api";
import { useAuth } from "../../Contexts/AuthContext";

const CreateSyllabus = () => {
  const [title, setTitle] = React.useState("");
  const [semester, setSemester] = React.useState("");
  const [course, setCourse] = React.useState({ code: "", title: "" });

  const { token } = useAuth();

  const postSyllabus = () => {
    console.log(token);
    api
      .post("/syllabus", {
        course_code: course.course_code,
        title,
        semester,
      })
      .then((res) => {
        localStorage.setItem("current_syllabus", res.data.id);
        window.location.href = "/edit";
      });
  };

  return (
    <div className="container">
      <h2 className="my-3">Create a Syllabus</h2>
      <CreationDropdown course={course} setCourse={setCourse} />
      <div className="row mx-0 gap-md-3">
        <input
          className="form-control mt-3 col-md"
          type="text"
          placeholder="Syllabus title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="form-control mt-3 col-md"
          type="text"
          placeholder="Semester"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
        />
        <button
          className="btn btn-success mt-3"
          onClick={() => {
            postSyllabus();
          }}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateSyllabus;
