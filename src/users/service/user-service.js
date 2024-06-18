const db = require('../../../db')
const bcrypt = require('bcrypt')
const tokenService = require('./token-service')
var ImageKit = require("imagekit");
const path = require('path');
const fs = require('fs');

var imagekit = new ImageKit({
   publicKey: process.env.PUBLIC_KEY,
   privateKey: process.env.PRIVATE_KEY,
   urlEndpoint: process.env.URL_ENDPOINT
});

class UserService {
   async registration(email, name, phone, position_id, token, photo) {
      try {
         const photoPath = photo.path
         const tokenRecord = await tokenService.verifyAndCheckToken(token)

         const candidate = await db.query('SELECT id FROM users WHERE email = $1 OR phone = $2', [email, phone]);
         if (candidate.rows.length > 0) {
            const error = new Error("User with this phone or email already exist");
            error.status = 409;
            throw error;
         }

         const fileBuffer = fs.readFileSync(photoPath);

         const uploadResponse = await imagekit.upload({
            file: fileBuffer,
            fileName: photo.filename,
            transformation: {
               pre: 'w-70,h-70,c-maintain_ratio,q-100',

            }
         });

         const user = await db.query('INSERT INTO users (email, name, phone, position_id, photo) VALUES ($1, $2, $3, $4, $5) RETURNING *', [email, name, phone, position_id, uploadResponse.url]);

         await db.query('UPDATE tokens SET user_id = $1, used = TRUE WHERE id = $2', [user.id, tokenRecord.id]);

         return {
            user_id: user.rows[0]?.id,
         };
      } catch (error) {
         console.error('Error registering user:', error);
         throw error;
      }
   }

   async getUsers(page, count) {
      try {
         const offset = (page - 1) * count;
         const query = `
    SELECT users.*, positions.id as possition_id, positions.name as position
    FROM users
    JOIN positions ON positions.id = users.position_id
    ORDER BY users.id DESC
    LIMIT $1 OFFSET $2;
`;
         const users = await db.query(query, [count, offset]);
         if (users.rows.length === 0 && page > 1) {
            const error = new Error('Page not found');
            error.status = 404;
            throw error;
         }
         return users.rows;
      } catch (error) {
         console.error('Error getting all users:', error);
         throw error; // Rethrow the error to the caller
      }
   }

   async getTotalUsersCount() {
      try {
         const query = 'SELECT COUNT(*) FROM users;';
         const result = await db.query(query);

         return parseInt(result.rows[0].count, 10);
      } catch (error) {
         console.error('Error getting total users count:', error);
         throw error;
      }
   }

   async getUserById(userId) {
      try {
         const query = `
            SELECT u.id, u.name, u.email, u.phone, p.name AS position, u.position_id, u.photo
            FROM users u
            JOIN positions p ON u.position_id = p.id
            WHERE u.id = $1;
        `;

         const user = await db.query(query, [userId]);

         if (user.rows.length === 0) {
            throw new Error('User not found');
         }


         return user?.rows?.[0];
      } catch (error) {
         console.error('Error getting user:', error);
         throw error; // Rethrow the error to the caller
      }
   }


}

module.exports = new UserService()