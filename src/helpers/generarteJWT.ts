import jwt from 'jsonwebtoken';
import config from '../config';

function generateJWT(id:string | number) {
  return jwt.sign({id}, config.JWT_SECRET, {
    expiresIn: '30d',
  });
}

export default generateJWT