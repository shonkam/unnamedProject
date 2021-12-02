import Axios from 'axios'

const url = 'http://localhost:3030/helloworld'

const helloWorld = async () => {
    const response = await Axios.get(url)
    return response
}

export default { helloWorld }