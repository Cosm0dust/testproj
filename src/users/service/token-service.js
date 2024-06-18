const jwt = require('jsonwebtoken')
const db = require('../../../db')


class TokenService {
   generateToken(payload) {
      const token = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '40m' })
      return {
         token
      }
   }

   async createTokenForRegistration() {
      const token = this.generateToken({ id: 1 })
      const expiresAt = new Date(Date.now() + 40 * 60 * 1000);
      const exactToken = token?.token
      const query = `
        INSERT INTO tokens (token, expires_at)
        VALUES ($1, $2)
        RETURNING *;
    `;

      try {
         const res = await db.query(query, [exactToken, expiresAt]);
         return res.rows?.[0]?.token;
      } catch (error) {
         console.error('Error creating token:', error);
         throw error;
      }
   }

   async verifyAndCheckToken(token) {
      try {

         const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

         const query = 'SELECT * FROM tokens WHERE token = $1';
         const res = await db.query(query, [token]);
         const tokenRecord = res.rows[0];


         if (!tokenRecord || tokenRecord.expires_at < new Date() || tokenRecord.used) {
            const error = new Error("The token expired or is already used.");
            error.status = 401;
            throw error;
         }

         return tokenRecord;
      } catch (error) {
         console.error('Error verifying or checking token:', error);
         throw error;
      }
   }
}

module.exports = new TokenService()