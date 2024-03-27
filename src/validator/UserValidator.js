const validator = require("validator");

 exports.ValidateEmail = async (email) => {
   try {
     var result = validator.isEmail(email);
     if (result) {
       return {result : result, message : "Email is valid"};
     }else{
      return {result : result, message : "Email is not valid"};
     }
   } catch (error) {
     throw error;
   }
 };

 exports.ValidateString = async (value) => {
   try {
     if (value === undefined || value === null || typeof value !== "string") {
       return {result :false , message : "Value is not a string"};
     }
     return {result:true};
   } catch (error) {
     throw error;
   }
 };

 exports.ValidatePhone = async (phone) => {
    try {
      var result = validator.isMobilePhone(phone);
      if (result) {
        return {result : result, message : "Phone is valid"};
      }else{
        return {result : result, message : "Phone is not valid"};
      }
    } catch (error) {
      throw error;
    }
 };
