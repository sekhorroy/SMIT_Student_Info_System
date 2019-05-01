const User = require('../../models/User');
const UserSession = require('../../models/UserSession');

module.exports = (app) => {
      app.post('/api/account/signin', (req, res, next)=>{
            const { body } = req;
            const { regNo, password } = body;

            if(!regNo) {
              return res.send({
                success: false,
                message: 'Error: No regno'
              })
            }

            if(!password){
              return res.send({
                success: false,
                message: 'Error: No password'
              })
            }

            User.find({
              regNo: regNo
            }, (err, users)=>{
              if(err){
                return res.send({
                  success: false,
                  message: "Server Error: user find not found"
                });
              }
              if(users.length == 0){
                return res.send({
                  success: false,
                  message: regNo
                });
              }

              const user = users[0];
              if(!user.validatePassword(password)) {
                return res.send({
                  success: false,
                  message: "Invalid password"
                });
              }

              //Otherwise correct user
              const userSession = new UserSession();
              userSession.userId = user._id;
              userSession.save((err, doc)=>{
                if(err) {
                  return res.send({
                    success: false,
                    message: 'Error: server error in saving user session'
                  });
                }

                return res.send({
                  success: true,
                  message: 'ValidSignin',
                  token: doc._id,
                  branch: doc.branch,
                });
                });
              });
        });

      app.get('/api/account/logout', (req, res, next)=>{
              const { query } = req;
              const { token } = query;

              UserSession.findOneAndRemove({
                _id: token,
                isDeleted: false
              }, (err, sessions)=>{
                if(err) {
                  return res.send({
                    success: false,
                    message: 'Error: Session could not logout'
                  });
                } else {
                  return res.send({
                    success: true,
                    message: 'Session logout successfully'
                  });
                }
              });
        });

      app.post('/api/account/signup', (req, res, next)=>{
              const { body } = req;
              const { regNo, password } = body;

              if (!regNo){
                return res.send({
                  success: false,
                  message: 'Error! regNo cannot be blank.'
                });
              }
              if (!password){
                return res.send({
                  success: false,
                  message: 'Error! password cannot be blank.'
                });
              }


              // find existing user matched the reg no
              User.find({
                regNo: regNo
              },(err, prevUsers)=>{
                if(err) {
                  return res.send({
                    success: false,
                    message: "Error: server finding error"
                  });
                }
                if(prevUsers.length>=1) {
                  return res.send({
                     success: false,
                     message: 'Error: User already exist'
                 });
                }
                else {
                  let newUser = new User();
                  newUser.regNo = regNo,
                  newUser.password = newUser.generateHash(password);
                  newUser.save((err, user)=>{
                    if(err){
                      return res.send({
                        success: false,
                        message: 'Server error couldnot save'
                      });
                    } else {
                      return res.send({
                        success: true,
                        message: 'Signed up'
                      });
                    }
                  });
                }
              });

              /*
              let newUser = new User();
              newUser.regNo = regNo,
              newUser.password = newUser.generateHash(password);
              newUser.save((err, user)=>{
                if(err){
                  return res.send({
                    success: false,
                    message: 'Server error couldnot save'
                  });
                } else {
                  return res.send({
                    success: true,
                    message: 'Signed up'
                  });
                }
              });
              */

        });

      app.get('/api/account/verify', (req, res, next)=>{
              const { query } = req;
              const { token } = query;

              UserSession.find({
                _id: token,
                isDeleted: false
              }, (err, sessions)=>{
                if(err){
                  return res.send({
                    success: false,
                    message: 'Error: Session couldnot establish'
                  });
                }
                if(sessions.length != 1){
                  return res.send({
                    success: false,
                    message: 'Error: Session could not be created successfully'
                  });
                } else {
                  return res.send({
                    success: true,
                    message: 'Session success'
                  });
                }
              });
        });
};
