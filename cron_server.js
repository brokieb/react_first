import express from 'express';

app = express();

// Schedule tasks to be run on the server.
cron.schedule('* * * * * *', function () {
	console.log('running a task every minute');
});

app.listen(3000);
