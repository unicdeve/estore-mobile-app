import axios from 'axios';


const FIELDS = 'email,name,picture';
const BASE_URL = `https://graph.facebook.com/me?fields=${FIELDS}`;

export const authAsync = async token => {
    try {
        const res = await axios.get(`${BASE_URL}&access_token=${token}`)

        if(res.status == 200) return res.data;

        throw new Error('Facebook request not successful')

    } catch (err) {
        throw err;
    }
}

export const Facebook = {
    authAsync,
}