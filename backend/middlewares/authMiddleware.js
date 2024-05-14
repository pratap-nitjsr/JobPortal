import JWT from 'jsonwebtoken';

const userAuth = async (req, res, next) => { 
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer')) { 
        next ('Authentication failed')
    }
    const token = authHeader.split(" ")[1];
    try {
        const payload = JWT.verify(token, process.env.JWT_SECRET_KEY)
        req.user = { userId: payload.userId }
        console.log(req.user)
        next()
    }
    catch (err) {
        next('Authentication failed');
    }
}

export default userAuth;