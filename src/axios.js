import Axios from 'axios'


// export default Axios

export default Axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:3001/',
})
