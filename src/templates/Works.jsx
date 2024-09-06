import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../utilities/Loading'
import { restBase } from '../utilities/Utilities'
import FeaturedImage from '../utilities/FeaturedImage'

const Works = () => {
    const restPath = restBase + 'fwd-work?_embed=true&order=asc&orderby=title'
    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath)
            if (response.ok) {
                const data = await response.json()
                setData(data)
                setLoadStatus(true)
            } else {
                setLoadStatus(false)
            }
        }
        fetchData()
    }, [restPath])

    return (
        <>
            {isLoaded ?
                <>
                    <h1>Works</h1>
                    {restData.map(work =>
                        <article key={work.id} id={`work-${work.id}`}>
                            {work.featured_media !== 0 && work._embedded &&
                                <FeaturedImage featuredImageObject={work._embedded['wp:featuredmedia'][0]} />
                            }
                            <h2>{work.title.rendered}</h2>
                            <div className="entry-content" dangerouslySetInnerHTML={{ __html: work.content.rendered }}></div>
                            <p>Work Category: {work._embedded['wp:term'][0][0].name}</p>
                        </article>
                    )}
                </>
                :
                <Loading />
            }
        </>
    )
}

export default Works
