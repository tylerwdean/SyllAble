import React, { useState, useEffect } from "react";
import axios from "axios";

const CreationDropdown = ({ course, setCourse }) => {
  const [choices, setChoices] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        console.log("Trying to fetch data");
        const response = await axios.get("/api/courses");
        console.log("Data fetched");
        setChoices(response.data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []); // Empty dependency array means this runs once on mount

  if (loading) {
    return (
      <select className="form-select">
        <option>Choose a course</option>
        <option disabled>Loading...</option>
      </select>
    );
  }

  if (error) {
    return (
      <select className="form-select">
        <option>Choose a course</option>
        <option disabled>Error loading courses</option>
      </select>
    );
  }

  return (
    <select
      className="form-select"
      value={course.course_code || "default"}
      onChange={(e) =>
        setCourse(
          choices.filter(
            (course) => course.course_code === e.target.value
          )[0] || {
            course_code: "",
            course_title: "",
          }
        )
      }
    >
      <option value="default">Choose a course</option>
      {choices &&
        choices.map((option) => (
          <option key={option.course_code} value={option.course_code}>
            {option.course_title}
          </option>
        ))}
    </select>
  );
};

export default CreationDropdown;
