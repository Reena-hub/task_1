const {check, query, param} = require('express-validator');

function Validate() {
    this.dataValidation = () => {
        return [
            check("name")
                .exists().withMessage("Name field is required")
                .notEmpty().withMessage("Name should not be empty").bail()
                .isString().withMessage("Invalid Name").bail()
                .isAlpha('en-US', {ignore: '\s'}).withMessage("Invalid Name").bail()
                .isLength({ min: 2, max: 30 }),
            check("last_name")
                .exists().withMessage("Last Name field is required")
                .notEmpty().withMessage("Name should not be empty").bail()
                .isString().withMessage("Invalid Name").bail()
                .isAlpha('en-US', {ignore: '\s'}).withMessage("Invalid Name").bail()
                .isLength({ min: 1, max: 30 }),
            check("email")
                .exists().withMessage("Email field is required")
                .notEmpty({ ignore_whitespace: true }).withMessage("Email should not be empty").bail()
                .isEmail().withMessage("Not a valid email"),
            check("password")
                .exists().withMessage("Password field is required")
                .notEmpty({ ignore_whitespace: true }).withMessage("Password should not be empty").bail()
                .isLength({ min: 6, max: 20 }).bail()
                .isStrongPassword().withMessage("Password is not strong"),
            check("confirm_password")
                .exists().withMessage("Password field is required")
        ];  
    }
    this.optionalValidate = () => {
        return [
            check("name")
                .optional()
                .notEmpty().withMessage("Should not be empty").bail()
                .isString().withMessage("Invalid Name").bail()
                .isAlpha().withMessage("Invalid Name").bail()
                .isLength({ min: 2, max: 30 }),
            check("last_name")
                .optional()
                .notEmpty().withMessage("Last Name should not be empty").bail()
                .isString().withMessage("Invalid Name").bail()
                .isAlpha('en-US', {ignore: '\s'}).withMessage("Invalid Name").bail()
                .isLength({ min: 1, max: 30 }),
            check("phone")
                .optional()
                .notEmpty().withMessage("Should not be empty").bail()
                .isInt().withMessage("Should be a number").bail()
                .isLength({ min: 10, max: 10 }).withMessage("Number should be 10 number").bail()
                .isMobilePhone('en-IN'),
            check("email")
                .optional()
                .notEmpty().withMessage("Should not be empty").bail()
                .isEmail().withMessage("Not a valid email"),
            check("password")
                .optional()
                .notEmpty().withMessage("Should not be empty").bail()
                .isLength({ min: 6, max: 20 }).bail()
        ];
    }
    this.checkId = () => {
        return [
            check('auth_token')
                .exists().withMessage("Auth_Token is required").bail()
                .isString().withMessage("Should be string").bail()
                .isLength({ max: 8, min: 8 }).withMessage("Should be of 6 characters")
        ];
    }
}

const validation = new Validate();

module.exports = validation;