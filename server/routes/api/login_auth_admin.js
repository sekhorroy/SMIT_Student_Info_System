const AdminSchema = require('../../models/Admin');
const UserSession = require('../../models/UserSession');

module.exports = (app) => {
  app.post('/api/admin/signup', (req, res, next)=>{
    const { body } = req;
    const { empId, password } = body;

    if(!empId || !password) {
      return res.send({
        success: false,
        message: 'Please enter the valid empid and password'
      });
    }

    AdminSchema.find({
      empId: empId
    }, (err, prevUsers)=>{
      if(err) {
        return res.send({
          success: false,
          message: "Error in signing up admin"
        });
      }

      if(prevUsers.length >= 1){
        return res.send({
          success: false,
          message: 'Error: User with similar empId already exists'
        });
      } else {
        let newUser = new AdminSchema();
        newUser.empId=empId,
        newUser.password = newUser.generateHash(password);
        newUser.save((err, user)=>{
          if(err) {
            return res.send({
              success: false,
              message: "Could not save new admin details"
            });
          } else {
            return res.send({
              success: true,
              message: "Signed up"
            });
          }
        });
      }
    });
  });
  app.post('/api/admin/signin', (req, res, next)=>{
    const { body } = req;
    const { empId, password} = body;

    if(!empId || !password){
      return res.send({
        success: false,
        message: 'Error: please enter valid empId and password'
      });
    }


    AdminSchema.findOne({
      empId: empId
    }, (err, user)=>{
      if(err){
        return res.send({
          success: false,
          message: 'Server Error: user cannot be found'
        });
      } else {
        if(!user){
          return res.send({
            success: false,
            message: 'Admin Doesnot exist'
          });
        } else {
          //const user = users[0];
          if(!user.validatePassword(password)) {
            return res.send({
              success: false,
              message: 'Invalid password'
            });
          }
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
  app.post('/api/admin/verify', (req, res, next)=>{
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
  app.post('/api/admin/logout', (req, res, next)=>{
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
}
