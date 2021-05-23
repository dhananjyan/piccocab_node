import twilio from 'twilio';

import { User } from '../data/models';

const LoginController = async (req, res) => {

    const accountSid = 'AC999243627c459829f3b74e59d0fa86a0';
    const authToken = '006c1682da6b5f68e58487e9cd97d813';
    let status = 200, from = req.body.phoneNumber;
    if (!from) res.send({
        status,
        errorMessage: "Something went wrong, please try again."
    })
    try {
        const client = twilio(accountSid, authToken);
        const user = await User.findOne({
            where: {
                phoneNumber: "444"
            }
        });
        await console.log('user', user)
    } catch (error) {
        console.log(error)
        status: 500;
    }
    res.send({
        status
    })
}

export default LoginController;