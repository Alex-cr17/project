import axios from 'axios';

const setAuthToken = token => {
    if(token) {
        axios.defaults.headers.common['Authorization'] = token;
        console.log(axios.defaults)
    }
    else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

export default setAuthToken;