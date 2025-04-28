import React, { useEffect, useState } from "react";
import api from "../../api.js";
import CourseInformationForm from "../CourseInformationForm/CourseInformationForm.jsx";
import CourseDescription from "../CourseDescription/CourseDescription.jsx";
import Paragraphs from "../Paragraphs/Paragraphs.jsx";
import FormContext from "../../Contexts/FormContext.jsx";
import fillTestData from "./fillTestData.jsx";
import { useAuth } from "../../Contexts/AuthContext.jsx";

const postFormToServer = async (data) => {
  try {
    // Send the data as JSON using Axios
    const response = await api.post("/submit-form", data, {
      headers: {
        "Content-Type": "application/json",
      },
      responseType: "blob", // Ensure the response is treated as a binary blob
    });

    // Handle the file download
    const blob = new Blob([response.data], {
      type: response.headers["content-type"],
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Syllabus.docx"; // Suggested filename
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);

    console.log("File downloaded successfully");
  } catch (error) {
    console.error("Error: ", error);
  }
};

const putFormToServer = async (syllabus) => {
  try {
    const id = localStorage.getItem("current_syllabus");
    api.put(`/syllabus/${id}`, { syllabus });
  } catch (error) {
    console.error(error);
  }
};

const getSyllabus = async () => {
  const id = localStorage.getItem("current_syllabus");
  const response = await api.get(`/syllabus/${id}`);
  return response.data;
};

function Form() {
  const [courseInformation, setCourseInformation] = useState({
    course_code: "",
    course_title: "",
    professor_name: "",
    office: "",
    office_hours: "",
    phone: "",
    email: "",
    semester: "",
    classroom: "",
    class_days: "",
    class_times: "",
  });

  const [paragraphs, setParagraphs] = useState([]);
  const [course_description, setCourseDescription] = useState("");
  const { isReady } = useAuth();

  useEffect(() => {
    if (!isReady) return;
    const loadData = async () => {
      try {
        const syllabus = await getSyllabus();
        console.log(syllabus);
        const { course_description, paragraphs, ...course_information } =
          syllabus;
        setParagraphs(paragraphs);
        setCourseDescription(course_description);
        setCourseInformation(course_information);
      } catch (error) {
        console.error("Error loading syllabus:", error);
      }
    };
    loadData();
  }, [isReady]);

  const submit = async (e) => {
    e.preventDefault();
    console.log("Put requested");
    //gather all the info together into the final json
    const syllabusJson = {
      ...courseInformation,
      course_description,
      paragraphs,
    };
    //PUT the json to the server
    await putFormToServer(syllabusJson);
  };

  return (
    <>
      <FormContext.Provider
        value={{
          courseInformation,
          setCourseInformation,
          paragraphs,
          setParagraphs,
        }}
      >
        <button
          className="btn btn-secondary mt-1 mb-1 col-2 offset-5"
          onClick={() => fillTestData(setCourseInformation, setParagraphs)}
        >
          Dev Button
        </button>
        <div
          className="container-fluid col-lg-8 col-md-10 col-sm-12"
          style={{ fontFamily: "initial", fontSize: "larger" }}
        >
          <CourseInformationForm />
          <CourseDescription course_description={course_description} />
          <Paragraphs submit={submit} />
        </div>
      </FormContext.Provider>
    </>
  );
}

export default Form;

//JMJ
