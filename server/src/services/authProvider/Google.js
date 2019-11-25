import axios from 'axios';


const BASE_URL = `https://www.googleapis.com/userinfo/v2/me`;

export const authAsync = async token => {
    try {
        const res = await axios.get(BASE_URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if(res.status == 200) return res.data;

        throw new Error('Facebook request not successful')

    } catch (err) {
        throw err;
    }
}

export const Google = {
    authAsync,
}