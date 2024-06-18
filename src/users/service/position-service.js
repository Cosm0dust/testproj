const db = require('../../../db')
const tokenService = require('./token-service')

class PositionService {
   async getPositionCount() {
      try {
         const result = await db.query('SELECT COUNT(*) FROM positions');
         return parseInt(result.rows[0].count, 10);
      } catch (err) {
         console.error('Error counting positions:', err);
         throw err;
      }
   }

   async getPositions() {
      try {
         const query = 'SELECT * FROM positions ORDER BY id ASC';
         const result = await db.query(query);

         if (result.rows.length === 0) {
            const error = new Error('Positions not found');
            error.status = 404;
            throw error;
         }
         return result.rows;
      } catch (e) {
         console.error('Error getting all users:', error);
         throw error; // Rethrow the error to the caller
      }
   }


}

module.exports = new PositionService()