import express from 'express';

app = express();

// Schedule tasks to be run on the server.
cron.schedule('* * * * * *', function () {});

app.listen(3000);
