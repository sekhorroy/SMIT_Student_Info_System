const FeeDepartmentSchema = require('../../models/feeDepartment.js');
const UserSession = require('../../models/UserSession');
const StudentDetail = require('../../models/StudentDetail');
const StudentAcademicDetail = require('../../models/StudentAcademics');
const FeeStructureCommonSchema = require('../../models/FeeStructureCommon');
const FeeDetail = require('../../models/FeeDetail');

module.exports = (app) => {

  //login-signup-api
  app.post('/api/feedepartment/signup', (req, res, next)=>{
    const { body } = req;
    const { empId, password } = body;

    if(!empId || !password) {
      return res.send({
        success: false,
        message: 'Please enter the valid empid and password'
      });
    }

    FeeDepartmentSchema.find({
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
        let newUser = new FeeDepartmentSchema();
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
  app.post('/api/feedepartment/signin', (req, res, next)=>{
    const { body } = req;
    const { empId, password} = body;

    if(!empId || !password){
      return res.send({
        success: false,
        message: 'Error: please enter valid empId and password'
      });
    }


    FeeDepartmentSchema.findOne({
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
            message: 'Fee User Doesnot exist'
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
  app.post('/api/feedepartment/verify', (req, res, next)=>{
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
  app.post('/api/feedepartment/logout', (req, res, next)=>{
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

  app.post('/api/feedepartment/getstudentfeedetails', (req, res, next)=>{
    const { body } = req;
    const { regNo } = body;

    StudentDetail.findOne({
        regNo: regNo
    }, (err, studentdetail)=>{
      if(err) {
        return res.send({
          success: false,
          message: "Server Error in finding Student Detais"
        });
      }
      if(!studentdetail) {
        return res.send({
          success: false,
          message: "Student RegNo doesnot exist"
        });
      } else {

        FeeStructureCommonSchema.findOne({
          branch: studentdetail.branch,
          course: studentdetail.course
        }, (err, feestructure)=>{
          if(err) {
            return res.send({
              success: false,
              message: "Server Error in finding Common Fee Structure"
            });
          }
          if(!feestructure) {
            return res.send({
              success: false,
              message: "Fee Structure doesnot exist in DB Contact Administrator"
            });
          }

          FeeDetail.findOne({
            regNo: regNo,
          }, (err, studentfeedetail)=>{
            if(err) {
              return res.send({
                success: false,
                message: "Server Error in finding Student Fee Detail"
              });
            }
            if(!studentfeedetail) {
              return res.send({
                success: false,
                message: "Student Fee Detail doesnot exist in DB Contact Administrator"
              });
            }

            return res.send({
              success: true,
              studentdetail: studentdetail,
              studentfeedetail: studentfeedetail,
              feestructure: feestructure
            });

          });

        });

      }
    });

  });
  app.post('/api/feedepartment/getmanyfeedetail', (req, res, next)=>{
    const { body } = req;
    const { semester, branch } = body;

    StudentDetail.aggregate([
        {
          $match : { $or: [ { branch: branch }, { semester: semester } ] }
        },{
        $lookup: {
            from: "feedetails", // collection name in db
            localField: "regNo",
            foreignField: "regNo",
            as: "feestructure"
          }
        }, {
          $unwind: "$feestructure"
        },{
          $unwind: "$feestructure.semester_fee"
        }, {
          $project: {
            regNo: "$regNo",
            name: "$name",
            feestructure: "$feestructure"
          }
        }]).exec(function(err, students) {
            if(err) {
              return res.send({
                success: false,
                message: 'Server Error in fetching Data'
              });
            }

            if(!students) {
              return res.send({
                success: false,
                message: 'student fee data not found'
              });
            }

            let newstudentdata = students.filter((student)=>{return student.feestructure.semester_fee.semester == semester});

            return res.send({
              success: true,
              data: newstudentdata
            });
    });

  });
  app.post('/api/feedepartment/updatemanydetail', (req, res, next)=>{
    const { body } = req;
    const { feeDetailArray } = body;

    let errorCheck = 0;

    feeDetailArray.forEach((student)=>{
      FeeDetail.findOne({
        regNo: student.regNo
      }, (err, docs)=>{
        if(err) {
          errorCheck = 1;
        }
        docs.semester_fee.forEach((semester)=>{
          if(semester.semester === student.feestructure.semester_fee.semester) {
            semester.messdeposit = student.feestructure.semester_fee.messdeposit;
            semester.hostelfee = student.feestructure.semester_fee.hostelfee;
            semester.libraryfine = student.feestructure.semester_fee.libraryfine;
            semester.otherfee = student.feestructure.semester_fee.otherfee;
          }
        });

        docs.save((err) => {
          if(err) {
            errorCheck=2;
          }
        });
      });
    });

    if(errorCheck === 0) {
      return res.send({
        success: true
      });
    } else {
      return res.send({
        success: false
      });
    }
  });
  app.post('/api/feedepartment/payfeedemo', (req, res, next)=>{
    const { body } = req;
    const { regNo, semester } = body;

    FeeDetail.findOne({
      regNo: regNo
    }, (err, docs)=>{
      if(err) {
        return res.send({
          success: false,
          message: "Server Error in Handling Fee Payment"
        });
      }

      if(!docs) {
        return res.send({
          success: false,
          message: "Fee Detail Not found in DB"
        });
      }

      let index = Number(semester);
      docs.semester_fee[index-1].ispaid = true;
      docs.save((err)=>{
        if(err) {
          return res.send({
            success: false,
            message: "Server Error in Saving Fee Payment"
          });
        }

        return res.send({
          success: true,
          message: "Payment Successfull"
        });
      })

    });

  });
  app.post('/api/feedepartment/updateStudentFee', (req, res, next)=>{
    const { body } = req;
    const { feedetail } = body;

    FeeDetail.findOne({
      regNo: feedetail.regNo
    }, (err, docs)=>{
      if(err) {
        return res.send({
          success: false,
          message: "Server Error in Finding Student Fee Detail"
        });
      }
      if(!docs) {
        return res.send({
          success: true,
          message: "Student Fee Detail not found Contact Adminstrator"
        });
      } else {
        docs.semester_fee = feedetail.semester_fee;
        docs.save((err)=>{
          if(err) {
            return res.send({
              success: false,
              message: "Server Error in Saving Data"
            });
          }

          return res.send({
            success: true,
            message: "Successfully Saved"
          });
        });
      }
    });
  });
}



/*
{
   $project:{
      rego: "$regNo",
      name: "$name",
      feestructure: "$feestructure.semester_fee"
}
}

{
   $project:{
      regNo: "$regNo",
      name: "$name",
      feestructure: {
        $filter: {
          input: "$feestructure.semester_fee",
          as: "semesterfee",
          cond: { $eq: [ "semesterfee.semester", semester ] }
        }
      }
    }
}
*/
