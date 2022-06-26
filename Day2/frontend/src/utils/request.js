import axios from 'axios'

const fetchData = async(url) => {
    const response = await axios.get(url)
    return response.data
}

export {fetchData}