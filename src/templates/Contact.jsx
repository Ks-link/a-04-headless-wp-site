import { useState, useEffect } from 'react'
import Loading from '../utilities/Loading'
import { restBase } from '../utilities/Utilities'

const Contact = () => {
    const restPath = restBase + 'pages/17';
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
                <article id={`post-${restData.id}`}>
                    <h1>{restData.title.rendered}</h1>
                    <div className="entry-content">
                        <section>
                            <h2>{restData.acf.our_address}</h2>
                            <p>{restData.acf.our_email}</p>
                        </section>

                    </div>
                </article>
                :
                <Loading />
            }
        </>
    )
}

export default Contact
