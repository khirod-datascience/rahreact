const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const morgan = require('morgan');
// const helmet = require('helmet');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
// const fileUpload = require('express-fileupload');

// require routes
const {
  UserRoutes,
  HospitalRoutes,
  ImageRoutes,
  SearchRoute,
  nextWordRoute,
  AdminRoute,
  AmbulanceRoute,
  StreamImage,
  Feedback,
} = require('./routes');

// database connection
const connectDB = require('./config/db');
connectDB();

// -- apply middlewares --
const corsOptions = {
  origin: ['http://localhost:3000', 'https://rah-frontend-sync.herokuapp.com'],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(helmet());
// app.use(multipartMiddleware);

// file upload middleware
// app.use(
//   fileUpload({
//     limits: { fileSize: 1024 * 1024 * 1 }, // 1mb
//     createParentPath: true,
//     // ! Comment below 2 lines when using AWS-S3
//     useTempFiles: true,
//     tempFileDir: path.join(__dirname, 'tmp'),
//   })
// );

// serve static folder to serve files
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(
  '/user/picture',
  express.static(path.join(__dirname, 'uploads', 'images'))
);

// morgan for logging every request status on console
app.use(morgan('dev'));

// -- END OF USING MIDDLEWARE --

// ROUTES
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
});

// api route
app.use('/api/user', UserRoutes);
app.use('/api/hospital', multipartMiddleware, HospitalRoutes);
app.use('/api/ambulance', AmbulanceRoute);
app.use('/api/images', ImageRoutes);
app.use('/api/img', StreamImage);
app.use('/api/search', SearchRoute);
app.use('/api/next', nextWordRoute);
app.use('/api/feedback', Feedback);
app.use('/api', AdminRoute);

// production build for reactjs
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
});

module.exports = app;
