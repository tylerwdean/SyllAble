import { useEffect, useState } from "react";
import api from "../api"; 

const SyllabiList = () => {
  const [syllabi, setSyllabi] = useState([]);

  useEffect(() => {
    api.get("/syllabi")
      .then((res) => setSyllabi(res.data))
      .catch((err) => console.error("Error fetching syllabi:", err));
  }, []);

  return (
    <div>
      <h2>All Syllabi</h2>
      <ul>
        {syllabi.map((s) => (
          <li key={s.id}>{s.courseCode} - {s.professorName}</li>
        ))}
      </ul>
    </div>
  );
};

export default SyllabiList;
