import React, { useEffect, useState } from "react";
import api from "../../api.js";
import CourseInformationForm from "../CourseInformationForm/CourseInformationForm.jsx";
import CourseDescription from "../CourseDescription/CourseDescription.jsx";
import Paragraphs from "../Paragraphs/Paragraphs.jsx";
import FormContext from "../../Contexts/FormContext.jsx";
import fillTestData from "./fillTestData.jsx";
import { useAuth } from "../../Contexts/AuthContext.jsx";

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
  const [timeoutID, setTimeoutID] = useState();
  const { isReady } = useAuth();
  const [isLoaded, setLoaded] = useState(false);

  const downloadSyllabus = async () => {
    try {
      const id = localStorage.getItem("current_syllabus");
      // Send the data as JSON using Axios
      const response = await api.get(`/syllabus/${id}/generate`, {
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
      await api.put(`/syllabus/${id}`, { syllabus });
    } catch (error) {
      console.error(error);
    }
  };

  const getSyllabus = async () => {
    const id = localStorage.getItem("current_syllabus");
    const response = await api.get(`/syllabus/${id}`);
    console.log(response);
    return response.data;
  };

  useEffect(() => {
    if (!isReady) return;
    const loadData = async () => {
      try {
        console.log("Fetching data");
        const syllabus = await getSyllabus();
        console.log(syllabus);
        const { course_description, paragraphs, ...course_information } =
          syllabus;
        setParagraphs(paragraphs);
        setCourseDescription(course_description);
        setCourseInformation(course_information);
        setLoaded(true);
      } catch (error) {
        console.error("Error loading syllabus:", error);
      }
    };
    loadData();
  }, [isReady]);

  useEffect(() => {
    if (!isLoaded) return;
    clearTimeout(timeoutID);
    const timeout = setTimeout(() => {
      // Function to be executed after the delay
      console.log("Auto-saving");
      putFormToServer({ course_description, paragraphs, ...courseInformation });
    }, 1200); // Delay of 1200 milliseconds (1.2 seconds)
    setTimeoutID(timeout);
  }, [courseInformation, paragraphs, isLoaded]);

  const save = async () => {
    //gather all the info together into the final json
    const syllabusJson = {
      ...courseInformation,
      course_description,
      paragraphs,
    };
    console.log(syllabusJson);
    //PUT the json to the server
    await putFormToServer(syllabusJson);
  };

  const submitDownload = async (e) => {
    e.preventDefault();
    await save();
    await downloadSyllabus();
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
          onClick={() =>
            fillTestData(courseInformation, setCourseInformation, setParagraphs)
          }
        >
          Dev Button
        </button>
        <div
          className="container-fluid col-lg-8 col-md-10 col-sm-12"
          style={{ fontFamily: "initial", fontSize: "larger" }}
        >
          <CourseInformationForm />
          <CourseDescription course_description={course_description} />
          <Paragraphs submitDownload={submitDownload} />
        </div>
      </FormContext.Provider>
    </>
  );
}

export default Form;

//JMJ
