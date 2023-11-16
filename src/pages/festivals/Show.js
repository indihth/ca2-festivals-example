import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

const Show = () => {
    const { id } = useParams();
    const [festival, setFestival] = useState(null);

    let token = localStorage.getItem('token');

    useEffect(() => {
        axios.get(`https://festivals-api.vercel.app/api/festivals/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log(response)
            setFestival(response.data)     // Puts data in 'festival' state
        })
        .catch(err => {
            console.error(err)
        })
    }, [id])

    if(!festival) return <h3>Festival not found</h3>

  return (
    <>
    <h2>Festival: {id}</h2>
    <div>
        <p><b>Title: </b>{festival.title}</p>
        <p><b>Description: </b>{festival.description}</p>
    </div>
    </>
  )
}

export default Show