import JWT from 'jsonwebtoken';
import authconfig from '../../config/authconfig';

import dotenv from "dotenv";
dotenv.config();

export default async (req, res, next) => {
    const authHeard = req.headers.authorization;
    if (!authHeard) {
        return res.status(401).json({ error: "Token not provided" });
    }

    // Primeiro declare o token
    const [, token] = authHeard.split(" ");

    // Agora pode usar o token
    console.log(token);

    try {
        const decoded = await (JWT.verify)(token, authconfig.secret);

        req.userId = decoded.id;
        console.log({decoded});

        return next();
    } catch (error) {
        console.log({error});
        return res.status(401).json({ error: "Token invalid" });
    }
};

