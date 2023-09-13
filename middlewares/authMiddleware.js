import jwt from 'jsonwebtoken';


//authentication
export const authentication = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    token = token.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, message: `UnAuthorized access` });
    } else {
      jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if (err) {
          return res.status(400).json({success:false,message:`Authentication failed ${err.message}`})
        }
        req.userId = data.userId;
        next();
      });
    }
  } catch (error) {
    return res.status(500).json({ error: `Error from authentication ${error.message}` });

  }
};