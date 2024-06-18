const db = require('../../../db')

class ValidateService {
   validateName(name) {
      if (!name || name.length < 2) {
         return ["The name must be at least 2 characters."];
      }
      return null;
   }

   validateEmail(email) {
      if (!email || !/\S+@\S+\.\S+/.test(email)) {
         return ["The email must be a valid email address."];
      }
      return null;
   }

   validatePhone(phone) {
      if (!phone || !phone.startsWith("+380")) {
         return ["The phone field is required and should start with +380 (Ukraine country code)."];
      }
      return null;
   }

   validatePositionId(position_id) {
      if (!position_id || isNaN(position_id)) {
         return ["The position id must be an integer."];
      }
      return null;
   }

   validatePhoto(photo) {
      const maxSize = 5 * 1024 * 1024;
      const allowedTypes = ['image/jpeg', 'image/jpg'];

      if (!photo) {
         return ["No photo uploaded."];
      }

      if (!allowedTypes.includes(photo.mimetype)) {
         return ["The photo must be in JPEG/JPG format."];
      }

      if (photo.size > maxSize) {
         return ["The photo may not be greater than 5 MB."];
      }

      if (photo.width < 70 || photo.height < 70) {
         return ["The minimum dimensions for the photo are 70x70 pixels."];
      }

      return null;
   }

   validateUserData = (req, res, next) => {
      const fails = {};
      const { name, email, phone, position_id } = req.body;
      const photo = req.file;


      fails.name = this.validateName(name);
      fails.email = this.validateEmail(email);
      fails.phone = this.validatePhone(phone);
      fails.position_id = this.validatePositionId(position_id);
      fails.photo = this.validatePhoto(photo);

      Object.keys(fails).forEach(key => fails[key] === null && delete fails[key]);

      if (Object.keys(fails).length > 0) {
         return res.status(422).json({ success: false, message: "Validation Failed", fails });
      }

      next();
   };

   validatePagination(req, res, next) {
      const fails = {};
      let { page, count } = req.query;

      page = parseInt(page, 10) || 1;
      count = parseInt(count, 10) || 6;

      if (!Number.isInteger(count)) {
         fails.count = ['The count must be an integer.'];
      }

      if (page < 1) {
         fails.page = ['The page must be at least 1.'];
      }

      if (Object.keys(fails).length > 0) {
         return res.status(422).json({ success: false, message: "Validation Failed", fails });
      }
      next();
   };

   validateUserId = (req, res, next) => {
      const userId = req.params.id;

      if (!Number.isInteger(Number(userId))) {
         return res.status(400).json({
            success: false,
            message: "The user with the requested id does not exist",
            fails: {
               userId: ["The user must be an integer."]
            }
         });
      }
      next();
   };

}

module.exports = new ValidateService()