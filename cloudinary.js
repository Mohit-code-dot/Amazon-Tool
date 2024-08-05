const cloudinary = require("cloudinary").v2;

// Configuration
cloudinary.config({ 
    cloud_name: 'dgsvocf0w', 
    api_key: '769681361645176', 
    api_secret: 'mHZbyzlvJkB7UJgbcixvLXUszCg'
  });

module.exports = cloudinary;