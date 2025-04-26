import Header from '../Components/Header/Header.jsx'
import Form from '../Components/Form/Form.jsx'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import CreationDropdown from '../Components/CreationDropdown/CreationDropdown.jsx'

function CreateSyllabus() {
  return (
    <>
      <Header />
      <div className='container'>
        <h2 className='my-4'>Please select a course:</h2>
        <CreationDropdown />
        
      </div>
    </>
  )
}

export default CreateSyllabus;
