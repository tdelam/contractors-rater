import axios from "axios";

console.log(`${process.env.REACT_APP_API_URL}/api/v1/contractors`);

export default axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api/v1/contractors`
})