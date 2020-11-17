const jwt = require('json-web-token')
const Admin = require("../models/admin");
var secret = 'this is the secret secret secret 12356';


module.exports.login = function (req, res) {
	res.render('auth/login')
}
module.exports.postlogin = function (req, res, next) {

	Admin.findOne({
		email: req.body.email
	})
		.then(user => {
			if (user && user.password === req.body.password) {
				res.locals.redirect = `/users/${user._id}`;
				req.flash("success", `${user.fullName}'s logged in successfully!`);
				res.locals.user = user;
				next();
			} else {
				req.flash("error", "Your account or password is incorrect.Please try again or contact your system administrator!");
				res.locals.redirect = "/auth/login";
				next();
			}
		})
		.catch(error => {
			console.log(`Error logging in user: ${error.message}`);
			next(error);
		});




}
