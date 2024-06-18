const db = require('../../../db')
const userService = require('../service/user-service')
const possitionService = require('../service/position-service')
const validateService = require('../service/validate-service')
const tokenService = require('../service/token-service')

const seederService = require('../service/seeder-service')

class UserController {
   handleError(error, res) {
      const status = error.status || 500;
      console.error(error.message);
      return res.status(status).json({
         success: false,
         message: error.message || "Internal Server Error",
      });
   };

   registerUser = async (req, res) => {
      const { name, email, phone, position_id } = req.body;
      const photo = req.file;

      const token = req.headers['token'] || req.headers['Token'];
      try {
         const userId = await userService.registration(email, name, phone, position_id, token, photo);

         return res.status(201).json({
            success: true,
            user_id: userId?.user_id,
            message: "New user successfully registered"
         });
      } catch (error) {
         return this.handleError(error, res);
      }
   }

   getUsers = async (req, res, next) => {
      let { page, count } = req.query;

      page = parseInt(page, 10) || 1;
      count = parseInt(count, 10) || 6;

      try {
         const users = await userService.getUsers(page, count);
         const totalUsers = await userService.getTotalUsersCount();

         const totalPages = Math.ceil(totalUsers / count);
         const nextPage = page < totalPages ? page + 1 : null;
         const prevPage = page > 1 ? page - 1 : null;

         res.json({
            success: true,
            page,
            total_pages: totalPages ?? 1,
            total_users: totalUsers ?? 0,
            count,
            links: {
               next_url: nextPage ? `/users?page=${nextPage}&count=${count}` : null,
               prev_url: prevPage ? `/users?page=${prevPage}&count=${count}` : null
            },
            users,
         });
      } catch (error) {
         return this.handleError(error, res);
      }
   }

   getUser = async (req, res, next) => {
      try {
         const userId = req.params.id;
         const user = await userService.getUserById(userId);

         if (!user) {
            return res.status(404).json({
               success: false,
               message: "User not found"
            });
         }

         res.status(200).json({ success: true, user });
      } catch (error) {
         return this.handleError(error, res);
      }
   }


   getPositions = async (req, res, next) => {
      try {
         const positions = await possitionService.getPositions()
         res.status(200).json({ success: true, positions });
      } catch (error) {
         return this.handleError(error, res);
      }
   }

   getToken = async (req, res, next) => {
      try {
         const token = await tokenService.createTokenForRegistration()
         res.status(200).json({ success: true, token })
      } catch (error) {
         console.error('Token creation error:', error);
      }
   }

   generateInitialUsers = async (req, res, next) => {
      try {
         const seed = await seederService.seedDatabase()
         res.status(200).json({ success: true })
      } catch (error) {
         console.error('Token creation error:', error);
      }

   }
}

module.exports = new UserController()