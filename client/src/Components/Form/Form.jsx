import React, { useState } from 'react'
import CourseInformationForm from '../CourseInformationForm/CourseInformationForm.jsx'
import CourseDescription from '../CourseDescription/CourseDescription.jsx'
import Paragraphs from '../Paragraphs/Paragraphs.jsx'
import FormContext from '../../Contexts/FormContext.jsx'

const postFormToServer = async (data) => {
    try {
        //turn data into a sendable json type
        const jsonData = JSON.stringify(data)
        const response = await fetch("/submit-form", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonData
        })

        if (!response.ok) {
            throw new Error('Network response was not okay')
        }

        // Handle the file download
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "Syllabus.docx"; // Suggested filename
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);

        console.log("File downloaded successfully")

    } catch (error) {
        console.error('Error: ', error)
    }


}

function Form() {

    const [courseInformation, setCourseInformation] = useState({
        courseCode: "",
        professorName: "",
        office: "",
        officeHours: "",
        phone: "",
        email: "",
        semester: "",
        classroom: "",
        classDays: "",
        classTimes: "",

    })
    const courseDescription = "Examines the basic concepts of programming languages: programming language processors, elementary and structured data types, subprograms, sequence control, data control, storage management, syntax and translation, and programming environments. The student will also study three different programming languages and write a short project in each."
    const [paragraphs, setParagraphs] = useState([])

    const submit = async (e) => {
        e.preventDefault()

        //gather all the info together into the final json
        const syllabusJson = { ...courseInformation, courseDescription, paragraphs }

        console.log(syllabusJson)
        //POST the json to the server
        await postFormToServer(syllabusJson)
    }

    return (
        <>
            <FormContext.Provider value={{ courseInformation, setCourseInformation, courseDescription, paragraphs, setParagraphs }}>
                <h2 className='text-center my-4'>Syllabus Editor</h2>
                <hr className='col-10 offset-1' />
                <form onSubmit={submit}>
                    <div className='container-fluid col-lg-8 col-md-10 col-sm-12'>
                        <CourseInformationForm />
                        <hr />
                        <CourseDescription />
                        <hr />
                        <Paragraphs />

                        <button className="btn btn-primary mt-3 mb-3 col-4" type="submit" id="submit-btn">Submit</button>
                    </div>
                </form>
            </FormContext.Provider>
        </>
    )
}

export default Form

//JMJ