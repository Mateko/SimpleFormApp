const User = require('../../models/User');
const moment = require('moment');

module.exports = (app) => {
  app.post('/saveform', (req, res, next) => {
    const { body } = req;

    const{
        firstName,
        lastName,
        email,
        date
      } = body;

    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    if(re.test(email) === false) {
      return res.send({
        success: false,
        message: 'Invalid email format'
      })
    }

    if (!firstName){
      return res.send({
      success: false,
      message: 'Fill up your first name!'
      });
    }

    if (!lastName){
      return res.send({
      success: false,
      message: 'Fill up your last name!'
      });
    }


    const newUser = new User();

    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.email = email;
    newUser.date = date;

    newUser.save((err, user) => {
      if(err){
        return res.send({
          success: false,
          message: 'Server error: ' + err
        });
      }

      return res.send({
        success: true,
        message: 'Completed!',
      });

    });
});

};
