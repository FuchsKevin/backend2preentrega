import jwt from 'jsonwebtoken'
import { PRIVATE_KEY } from '../utiils/authToken.js'

export const authToken = (req, res, next) => {
    const authHeader = req.headers['authorization'] // Bearer añsdkflñaskdfñas(token)
    // console.log(authHeader)
    const token = authHeader.split(' ')[1]
    jwt.verify(token, PRIVATE_KEY, (error, userDataDecode) => {
        if(error) return res.send({status: 'success', error: 'no atuhorized'})
            console.log(userDataDecode)
        req.user = userDataDecode
        next()

    })
}