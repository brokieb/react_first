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
	axiosInstance
		.get('/api/getProducts')
		.then((ans) => {})
		.catch((err) => {});
});

app.listen(port, () => {});
