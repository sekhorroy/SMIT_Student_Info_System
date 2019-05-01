const Faculty = require('../../models/Faculty');
const UserSession = require('../../models/UserSession');

module.exports = (app) => {
  app.post('/api/facultyaccount/signup', (req, res, next)=>{
    const { body } = req;
    const { empId, password, branch } = body;

    if(!empId && !password) {
      return res.send({
        success: false,
        message: 'Error: Enter empId and password'
      })
    }

    Faculty.find({
      empId: empId
    }, (err, users)=>{
      if(err){
        return res.send({
          success: false,
          message: 'Error: server could not find the faculty id'
        });
      }

      if(users.length!=0){
        return res.send({
          success: false,
          message: 'Error: faculty already exists'
        });
      } else {
        let newUser = new Faculty();
        newUser.empId = empId;
        newUser.password = newUser.generateHash(password);
        newUser.branch=branch;
        newUser.save((err)=>{
          if(err){
            return res.send({
              success: false,
              message: 'Error: Server error in saving faculty Details'
            });
          } else {
            return res.send({
              success: true,
              message: 'successfully signed up'
            });
          }
        });
      }
    });

  });

  app.post('/api/facultyaccount/signin', (req, res, next)=>{
    const { body } = req;
    const { empId, password} = body;

    if(!empId && !password){
      return res.send({
        success: false,
        message: 'Error: please enter valid empId and password'
      });
    }


    Faculty.find({
      empId: empId
    }, (err, users)=>{
      if(err){
        return res.send({
          success: false,
          message: 'Server Error: user cannot be found'
        });
      } else {
        if(users.length == 0) {
          return res.send({
            success: false,
            message: 'Invalid User Id'
          });
        }
        const user = users[0];
        if(!user.validatePassword(password)) {
          return res.send({
            success: false,
            message: 'Invalid password'
          });
        }

        //otherwise correct user setup session

        const userSession = new UserSession();
        userSession.userId = user._id;
        userSession.save((err, session)=>{
          if(err) {
            return res.send({
              success: false,
              message: 'Error: server could not establish a session'
            });
          } else {
            return res.send({
              success: true,
              message: 'ValidSignin',
              token: session._id,
              branch: user.branch
            });
          }
        });

      }
    });
  });

  app.post('/api/facultyaccount/logout', (req, res, next)=>{
    const { body } = req;
    const { token } = body;

    UserSession.findOneAndRemove({
      _id: token,
      isDeleted: false
    }, (err)=>{
      if(err){
        return res.send({
          success: false,
          message: 'Error: couldnot delete session'
        });
      } else {
        return res.send({
          success: true,
          message: 'Session logout successfull'
        });
      }
    });
  });

  app.post('/api/facultyaccount/verify', (req, res, next)=>{
    const { body } = req;
    const { token } = body;

    UserSession.findById(token, function(err, session) {
      if(err){
        return res.send({
          success: false,
          message: 'Server error in finding user_id'
        });
      }
      if(session === null) {
        return res.send({
          success: false,
          message: 'Error: session could not be created successfully'
        });
      }
      else {
        return res.send({
          success: true,
          message: 'Session success'
        });
      }
    });
  });
}
