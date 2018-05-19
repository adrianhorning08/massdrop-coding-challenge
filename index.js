const axios = require("axios");


const fetchSomething = async url => {
  try {
      const response = await axios.get(url);
      const data = await response.data;
      return data
  } catch(error) {
      return error;
  }
}

fetchSomething('https://www.google.com/')
    .then(data => console.log(data))
    .catch(reason => console.log(reason.message))
