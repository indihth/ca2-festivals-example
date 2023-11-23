import React from 'react'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from '../../config/api'

const Edit = () => {
  const { id } = useParams();
  const [festival, setFestival] = useState(null);

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    title: "",
    description: "",
    city: "",
    start_date: "",
    end_date: "",
  });

  const errorStyle = {
    color: 'red',
    marginStart: '3px'
  }

  let token = localStorage.getItem('token');

  useEffect(() => {
    axios.get(`/festivals/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        console.log(response)
        setFestival(response.data)    // Puts data in 'festival' state
        setForm(response.data)        // Fills form with existing data
    })
    .catch(err => {
        console.error(err)
    })
}, [id])

  // Handles multiple form fields
  const handleForm = (e) => {
    setForm((prevState) => ({
      ...prevState,
      // Uses name="" and value="" from form to setForm []: ""
      [e.target.name]: e.target.value,
    }));
  };

  const isRequired = (fields) => {
    let included = true;
    setErrors({})

    fields.forEach(field => {
        // Square notation changes to value of
        if(!form[field]) {
            // console.log(`${field} is required`)

            included = false;
            // Remember the previous state
            setErrors(prevState => ({
                ...prevState,
                [field]: {
                    message: `${field} is required`
                }
            }))
        }
    });

    return included;
  };

  const submitForm = (e) => {
    e.preventDefault(); // Prevents page reload on form submit
    
    // Only submits data is required fields are filled
    if (isRequired(["title", "description", "city"])) {
        let token = localStorage.getItem("token");
        
        console.log("submitted", form);
      axios
        .put(`/festivals/${id}`, form, {    // Put method with id in URL
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          navigate(`/festivals/${id}`);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };


  if(!festival) return <h3>Festival not found</h3>
  return (
    <>
        <h2>Edit Festival</h2>
        <form onSubmit={submitForm}>
        <div>
          Title:{" "}
          <input
            type="text"
            onChange={handleForm}
            value={form.title}
            name="title"
          />
          {/* ? will display if a title exists */}
          <span style={errorStyle}>{errors.title?.message}</span>
        </div>
        <div>
          Description:{" "}
          <input
            type="text"
            onChange={handleForm}
            value={form.description}
            name="description"
          />
            <span style={errorStyle}>{errors.description?.message}</span>
        </div>
        <div>
          City:{" "}
          <input
            type="text"
            onChange={handleForm}
            value={form.city}
            name="city"
          />
            <span style={errorStyle}>{errors.city?.message}</span>
        </div>
        <div>
          Start Date:{" "}
          <input
            type="datetime-local"
            onChange={handleForm}
            value={form.startDate}
            name="start_date"
          />
            <span style={errorStyle}>{errors.startDate?.message}</span>
        </div>
        <div>
          End Date:{" "}
          <input
            type="datetime-local"
            onChange={handleForm}
            value={form.endDate}
            name="end_date"
          />
            <span style={errorStyle}>{errors.endDate?.message}</span>
        </div>
        <input type="submit" />
      </form>
    </>
  )
}

export default Edit