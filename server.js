import axiosInstance from 'app/lib/axiosInstance';
const express = require('express');
const cron = require('node-cron');
const app = express();
const dotenv = require('dotenv');
const port = 3001;
dotenv.config();

const instance = axiosInstance.create({
	baseURL: process.env.ADDRESS,
});

cron.schedule('* * * * * *', function () {
	console.log(process.env.ADDRESS);
	axiosInstance
		.get('/api/getProducts')
		.then((ans) => {
			console.log(ans.data);
		})
		.catch((err) => {
			console.log(err, '____');
		});
});

app.listen(port, () => {
	console.log(`Cron server runing on port ${port}`);
});
