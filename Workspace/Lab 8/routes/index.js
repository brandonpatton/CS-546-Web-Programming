const palindromeRoutes = require('./palindrome'); 
const resultsRoutes = require('./result');

const constructorMethod = app => { 
	app.use("/", palindromeRoutes);
  	app.use("/result", resultsRoutes);

	app.use('*', (req, res) => {      
		res.redirect('/');
	});
};

module.exports = constructorMethod;
