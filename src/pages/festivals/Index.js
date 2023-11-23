import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import DeleteBtn from '../../components/DeleteBtn';

const Index = ({authenticated}) => {

    const [festivals, setFestivals] = useState([]);

    useEffect(() => {
        axios.get('https://festivals-api.vercel.app/api/festivals')
            .then(response => {
                console.log(response)
                setFestivals(response.data)     // Puts data in 'festival' state
            })
            .catch(err => {
                console.error(err)
            })
    }, [])

    const removeFestival = (id) => {
        console.log(`Deleted id: ${id}`)

        // Filter and add festivals that DON'T match id to state
        let updatedFestivals = festivals.filter((festival) => {
            return festival._id !== id;
        })
    }

    if(festivals.length === 0) return <h3>There are no festivals</h3>

    const festivalList = festivals.map(festival => {
        return (
            <div key={festival._id}>
                {(authenticated) ?
                <p><b>Title: </b> <Link to={`/festivals/${festival._id}`}>{festival.title}</Link></p>
                : <p><b>Title: </b> {festival.title}</p>
                }
                {/* <p><b>Title: </b> <Link to={`/festivals/${festival._id}`}>{festival.title}</Link></p> */}
                <p><b>Description: </b> {festival.description}</p>
                <DeleteBtn resource="festivals" id={festival._id} deleteCallback={removeFestival}/>
            </div>
        )
    })

  return (
    <>
        <h2>All Festivals</h2>
        {festivalList}
    </>
  )
}

export default Index