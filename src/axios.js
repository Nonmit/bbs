import Axios from 'axios'


// // export default Axios

export default Axios.create({
  withCredentials: true,
  baseURL: 'http://101.37.168.123:8013/api/',
})
// export default Axios.create({
//     withCredentials: true,
//     baseURL: 'http://localhost:3002/',
// })