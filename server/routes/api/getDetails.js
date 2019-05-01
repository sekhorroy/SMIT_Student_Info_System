const User = require('../../models/User');
const UserSession = require('../../models/UserSession');
const StudentDetail = require('../../models/StudentDetail');
const FeeDetail = require('../../models/FeeDetail');
const FeeStructureCommonSchema = require('../../models/FeeStructureCommon');
const StudentAcademicDetail = require('../../models/StudentAcademics');
const QuizSchema = require('../../models/Quiz');

module.exports = (app) => {
  app.get('/api/account/getdetails', (req, res, next) => {
    const { query } = req;
    const { token } = query;

    UserSession.find({
      _id: token,
      isDeleted: false
    }, (err, session)=> {
      if(err){
        return res.send({
          success: false,
          message: "Error: could not find session"
        });
      }
      /*
      if(sessions.length != 1){
        return res.send({
          success: false,
          message: "Error: session already exist"
        });
      }*/
      else{
       const { userId } = session[0];
          User.find({
             _id: userId,
           }, (err, users)=>{
             if(err) {
               return res.send({
                 success: false,
                 message: 'Error: getdetails could not find user'
               });
             }

            /*
             const user = users[0];
             return res.send({
               success: true,
               message: "Success: received user data",
               data: users[0]
             });
            */

             //const data = users[0];
            const { regNo } = users[0];
             StudentDetail.find({
               regNo: regNo
             }, (err, details)=>{
               if(err){
                 return res.send({
                   success: false,
                   message: 'Error: getDetails could not find user 2'
                 });
               }
               if(details.length!=1){
                 return res.send({
                   success: false,
                   message: regNo
                 });
               }
               return res.send({
                 success: true,
                 message: 'Student details found',
                 data: details[0]
               });
             });

       });
     }

    });
  });

/*
  app.get('/api/account/getresultcurrentsems', (req, res, next)=>{
    const { query } = req;
    const { regNo } = query;

    StudentDetail.find({
      regNo: regNo
    }, (err, details)=>{
      if(err){

      }
    });
  });
  */
  app.get('/api/account/getallfeedetails', (req, res, next)=>{
    const { query } = req;
    const { regNo } = query;

    FeeDetail.find({
      regNo: regNo
    }, (err, details)=>{
      if(err){
        return res.send({
          success: false,
          message: 'Error: server failde to extract fee details'
        });
      } else {
        return res.send({
          success: true,
          message: 'successfully retreived data',
          data: details[0]
        });
      }
    });
  });

  app.get('/api/account/getonestudentacademicdetail', (req, res, next)=>{
    const { query } = req;
    const { regNo } = query;

    StudentAcademicDetail.find({
      regNo: regNo
    }, (err, details)=>{
      if(err){
        return res.send({
          success: false,
          message: 'Error: server error in getting data'
        });
      }
      if(details.length === 0){
        return res.send({
          success: false,
          message: 'Error: details not found'
        });
      } else {
        return res.send({
          success: true,
          message: 'successfull retreived data',
          data: details[0]
        });
      }
    });
  });

  app.post('/api/account/getfeedetails', (req, res, next)=>{
    const { body } = req;
    const { branch, course, currentsem, regNo } = body;

    FeeStructureCommonSchema.findOne({
      branch: branch,
      course: course
    }, "semester_fee -_id" ,(err, docs)=>{
        if(err) {
          return res.send({
            success: false,
            message: "Semester Fee Data Failed to retreive"
          });
        }
        if(!docs) {
          return res.send({
            success: false,
            message: "Semester Data Not Found In DB Contact Administrator"
          });
        }

        //
        FeeDetail.findOne({
          regNo: regNo
        }, (err, doc)=>{
          if(err) {
            return res.send({
              success: false,
              message: "Student Fee Data Failed to retreive"
            });
          }
          if(!doc) {
            return res.send({
              success: false,
              message: "StudentFee Data Not Found In DB Contact Administrator"
            });
          }

          return res.send({
            success: true,
            semesterfee: docs,
            studentfee: doc
          });
        });
    });

  });

  app.post('/api/account/getquizdetails', (req, res, next)=>{
    const { body } = req;
    const { branch, semester, sec } = body;

    QuizSchema.findOne({
      branch: branch,
      semester: semester,
      sec: sec
    }, (err, docs)=>{
      if(err) {
        return res.send({
          success: false
        });
      } else {
        return res.send({
          success: true,
          data: docs
        });
      }
    });
  });

  app.post('/api/account/checkduesregistration', (req, res, next)=>{
    const { body } = req;
    const { regNo, currentsem } = body;

    FeeDetail.findOne({
      regNo: regNo
    }, (err, docs)=>{
      if(err) {
        return res.send({
          success: false,
          message: "Unable to retreive data from server"
        });
      }
      if(!docs) {
        return res.send({
          success: false,
          message: "Student Fee Detail not present in DB"
        });
      } else {
        let index = Number(currentsem);
        let checkFee = docs.semester_fee[index-1].ispaid;
        return res.send({
          success: true,
          checkFee: checkFee
        });
      }
    });
  });

};
