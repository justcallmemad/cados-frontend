import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

const HomePage = () => {

    const [advocates, setAdvocates]= useState([])
    const [total, setTotal ]= useState(0)
    const [pagination, setPagination] = useState(null)

    useEffect(() =>{

        getData()

    }, [])

    let getData = async (query = '') => {
        let response = await axios.get(`https://cados.up.railway.app/advocates?query=${query}`)
        console.log('RESPONSE:', response)
        setAdvocates(response.data.advocates)
        setTotal(response.data.total)
        setPagination(response.data.pagination)

    }

    let searchData = (e) => {
        e.preventDefault()
        let query = e.target.query.value
        getData(query)
    }
    return (
        <div className="main--container">
            <h1>Search {total} developer advocates</h1>
            <p>{pagination?.results_found} Developers found</p>
            <div className="form--wrapper">
                <form onSubmit={searchData} id="search_form">
                    <input type="text" name="query" placeholder="Search advocates.."/>
                    <input type="submit" value="Search" className="btn--primary"/>
                </form>
            </div>
            <div className="advocate_list">
                {advocates.map((advocate, index)=> (
                    <div className="advocate_preview_wrapper" key={index}>
                        <div className="advocate_preview_header">
                            <Link to={`/advocate/${advocate.username}`}>
                                <img className="advocate_preview_image" alt="view pic" src={advocate.profile_pic}/>
                            </Link>
                            <div>
                                <strong>{advocate.name}</strong>
                                <br/>
                                <a href={advocate.twitter} target="_blank">@{advocate.username}</a>
                            </div>
                        </div>
                        <small className="bio--preview">{advocate.bio}</small>
                       
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HomePage