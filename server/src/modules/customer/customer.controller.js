import * as Yup from 'yup';

import { PROVIDER_ENUM } from './customer.model';
import { AuthProvider } from '../../services/authProvider';
import { getOrCreateCustomer, me } from './customer';
import { AuthServices } from '../../services/Auth';


export const create = async (req, res) => {
    const { token, provider } = req.body;
    const bodySchema = Yup.object().shape({
        token: Yup.string().required(),
        provider: Yup.string()
            .oneOf(PROVIDER_ENUM)
            .required()
    });

    try {
        await bodySchema.validate({ token, provider });

        let data;

        if (provider === "FACEBOOK") {
            data = await AuthProvider.Facebook.authAsync(token);
        } else if (provider === 'GOOGLE') {
            data = await AuthProvider.Google.authAsync(token)
        } else {
            res.sendStatus(400)
        }

        const customer = await getOrCreateCustomer(data, provider);

        const jwtToken = AuthServices.createToken(customer);

        res.status(201).json({token: jwtToken});

    } catch(err) {
        res.status(400).json({ message: err.message });
    }
}

export const getUserInfo = async (req, res) => {
    try {
        if(req.user) {
            const userInfo = await me(req.user._id);

            res.json(userInfo);
        } else {
            res.status(400).json({ message: "User not found"});
        }
    } catch (e) {
        res.status(400).json({ message: e.message});
    }
}