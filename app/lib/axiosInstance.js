const axios = require('axios');
const axiosInstance = axios.create({
	baseURL: process.env.ADDRESS,
	// timeout: 1000,
	headers: {
		'Content-Type': 'application/json',
		// 'Accept': 'application/vnd.GitHub.v3+json',
		//'Authorization': 'token <your-token-here> -- https://docs.GitHub.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token'
	},
});

export default axiosInstance;
