const express = require('express');
const { default: mongoose } = require('mongoose');
const { MONGO_URI } = require('./config/index');
const app = express();
const ChapterRoute = require('./routes');
const { jsonResponseMiddleware } = require('./middlewares/json-response.middleware');

mongoose.connect(MONGO_URI).then(() => {
    console.log('✅ Connexion to mongodb success');
}).catch(error => {
    console.log(error);
});

app.use(express.json());
app.use(jsonResponseMiddleware);
app.use(express.urlencoded({extended: true}));

app.use('/api', ChapterRoute);

app.listen(3000, () => {
    console.log('✅ Server is running on port 3000');
})