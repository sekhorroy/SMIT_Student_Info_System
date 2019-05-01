const Faculty = require('../../models/Faculty');
const SemesterSubjectSchema = require('../../models/SemesterSubjectDetail');
const StudentDetail = require('../../models/StudentDetail');
const StudentAcademicDetail = require('../../models/StudentAcademics');
const QuizSchema = require('../../models/Quiz');

module.exports = (app) => {
  app.post('/api/facultyaccount/registration', (req, res, next)=>{
    const { body } = req;
    const { empId, branch, semester, sec, subjectname, subjectcode } = body;

    if(!empId || !branch || !semester || !sec || !subjectname || !subjectcode) {
      return res.send({
        success: false,
        message: "Please enter all necessary details"
      });
    }

    Faculty.findOne({
      empId: empId,
      branch: branch
    }, (err, faculty)=>{
      if(err) {
        return res.send({
          success: false,
          message: "Server Error in finding Faculty User"
        });
      }

      if(faculty) {
        faculty.classes.push({
          semester: semester,
          sec: sec,
          subjectname: subjectname,
          subjectcode: subjectcode
        });
        faculty.save((err)=>{
          if(err) {
            return res.send({
              success: false,
              message: "Server Error in saving classes data for faculty"
            });
          } else {
            return res.send({
              success: true,
              message: "Successfully Saved Data"
            });
          }
        })
      } else {
        return res.send({
          success: false,
          message: "Faculty Not Found"
        });
      }
    });
  });

  app.post('/api/facultyaccount/registrationgetsemdetail', (req, res, next)=>{
    const { body } = req;
    const { semester, branch } = body;

    SemesterSubjectSchema.findOne({
        semester: semester,
        branch: branch
    }, (err, docs)=>{
      if(err) {
        return res.send({
          success: false,
          message: 'Not Successful'
        });
      } else {
        return res.send({
          success: true,
          message: "Successfull",
          data: docs
        });
      }
    });
  });

  app.post('/api/facultyaccount/getregistrationsubjectdetail', (req, res, next)=>{
    const { body } = req;
    const { empId, branch } = body;

    Faculty.findOne({
      empId: empId,
      branch: branch
    }, (err, faculty)=>{
      if(err) {
        return res.send({
          success: false,
          message: "Server Error in finding the user"
        });
      }
      if(faculty) {
        return res.send({
          success: true,
          data: faculty.classes
        });
      } else {
        return res.send({
          success: false,
          message: "Faculty detail not found"
        });
      }
    });
  });

  app.post('/api/facultyaccount/deleteregistrationsubject', (req, res, next)=>{
    const { body } = req;
    const { empId, subjectcode } = body;


    Faculty.findOneAndUpdate({
      empId: empId
    }, {
      $pull: { classes: { subjectcode: subjectcode } }
    }, {safe: true}, (err)=>{
      if(err) {
        return res.send({
          success: false
        });
      } else {
        return res.send({
          success: true
        });
      }
    });

  });

  app.post('/api/facultyaccount/updatecgpa', (req, res, next)=>{
    const { body } = req;
    const { regNo, updated_cgpa } = body;

    StudentAcademicDetail.findOneAndUpdate({
      regNo: regNo
    }, {
        $set: { cgpa: updated_cgpa }
    }, null, (err, doc)=>{
      if(err) {
        return res.send({
          success: false,
          message: "Failed to Update CGPA"
        });
      } else {
        return res.send({
          success: true,
          message: "Successfully Updated CGPA"
        });
      }
    });

  });

  app.post('/api/facultyaccount/getacademicresult', (req, res, next)=>{
    const { body } = req;
    const { semester, sec, subjectcode, branch } = body;

    if( !semester || !sec || !subjectcode || !branch ) {
      return res.send({
        success: false,
      });
    }

    /*
    StudentAcademicDetail.find({
      currentsem: semester,
      branch: branch,
      sec: sec,
      'subject.subjectcode ' : { $in: subjectcode }
    }, "regNo sec subject", (err, docs)=>{
      if(err) {
        return res.send({
          success: false,
          message: "Server Error in Finding student details"
        });
      } else{
        return res.send({
          success: true,
          data: docs
        });
      }
    });
    */

    StudentAcademicDetail.find({
      currentsem: semester,
      branch: branch,
      sec: sec,
      'subject.subjectcode' : { $in: subjectcode }
    }, {
      "regNo": 1,
      subject: {$elemMatch: {subjectcode: subjectcode}}
    }, (err, docs)=>{
     if(err) {
       return res.send({
         success: false
       });
     } else {
       if(docs.length > 0){
         return res.send({
           success: true,
           data: docs
         });
       }
     }
   });


  });

  app.post('/api/facultyaccount/updateacademicmarks', (req, res, next)=>{
    const { body } = req;
    const { option, jsonStudentAcademicData, subjectcode } =  body;

    if(!option && !jsonStudentAcademicData && !subjectcode) {
      return res.send({
        success: false
      });
    }

    let errorCheck = 0;

    jsonStudentAcademicData.forEach((student)=>{
      StudentAcademicDetail.findOne({
        regNo: student.regNo
      }, (err, doc)=>{
        if(err) {
          errorCheck = 1;
        } else {
          doc.subject.forEach((subject1)=>{
            if(subject1.subjectcode === subjectcode){
              subject1[option] = student[option];
            }
          });
          doc.save((err)=>{
            if(err) {
              errorCheck = 1;
            }
          });
        }
      });
    });

    if(errorCheck == 0) {
      return res.send({
        success: true,
        message: 'Successfully saved data'
      });
    } else {
      return res.send({
        success: false,
        message: 'Unsuccessfull'
      });
    }
  });

  app.post('/api/facultyaccount/checkstudentdetails', (req, res, next)=>{
    const { body } = req;
    const { regNo } = body;

    let studentdata = {
    }

    StudentDetail.findOne({
      regNo: regNo
    }, (err, docs1)=>{
      if(err) {
        return res.send({
          success: false,
        });
      } else {
        if(!docs1){
          return res.send({
            success: false,
          });
        }
        StudentAcademicDetail.findOne({
          regNo: regNo
        }, (err, docs2)=>{
          if(err){
            return res.send({
              success: false,
            });
          } else {
            if(!docs2){
              return res.send({
                success: false,
              });
            }
            return res.send({
              success: true,
              studentdata: docs1,
              academicdetail: docs2,
            });
          }
        });
      }
    });
  });

  app.post('/api/facultyaccount/generateelectivelist', (req, res, next)=>{
    const { body } = req;
    const { semester, branch } = body;

    SemesterSubjectSchema.find({
      semester: semester,
      branch: branch
    }, "electivesubject -_id",(err, docs)=>{
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

  app.post('/api/facultyaccount/generateelectivesubjectallotmentlist', (req, res, next)=>{
    const { body } = req;
    const { semester, branch, subjectcode } = body;

    StudentAcademicDetail.find({
      currentsem: semester,
      branch: branch,
      'subject.subjectcode': {$in: subjectcode}
    }, "regNo -_id", (err, docs)=>{
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

  app.post('/api/facultyaccount/generateQuestion', (req, res,next)=>{
    const { body } = req;
    const { semester, branch, sec, question, option, correct, isVisible } = body;

    QuizSchema.findOne({
      semester: semester,
      branch: branch,
      sec: sec
    }, (err, docs)=>{
      if(err) {
        return res.send({
          success: false,
          message: "Unable to Find Question"
        });
      }
      if(!docs) {
        //new add
        let quizSchema = new QuizSchema();
        quizSchema.semester = semester;
        quizSchema.branch = branch;
        quizSchema.sec = sec;
        quizSchema.isVisible = isVisible;

        let quiz = {
          question: question,
          option: option,
          answer: correct
        }

        quizSchema.quiz.push(quiz);

        quizSchema.save((err)=>{
          if(err) {
            return res.send({
              success: false,
              message: "Error in saving new quiz"
            });
          } else {
            return res.send({
              success: true,
              message: "Successfully Saved New Quiz in DB"
            });
          }
        })
      } else {

        docs.quiz.push({
          question: question,
          option: option,
          answer: correct
        });

        docs.save((err)=>{
          if(err) {
            return res.send({
              success: false,
              message: "Error in saving new quiz"
            });
          } else {
            return res.send({
              success: true,
              message: "Successfully Saved New Quiz in DB"
            });
          }
        });

      }
    });

  });

  app.post('/api/facultyaccount/submitQuiz', (req, res, next)=>{
    const { body } = req;
    const { quiz_id, regNo, branch, semester, sec, value } = body;

    QuizSchema.findOne({
      semester: semester,
      branch: branch
    }, (err, docs)=>{
      if(err) {
        return res.send({
          success: false,
          message: "Server Error in finding Quiz in DB"
        });
      }
      if(!docs) {
        return res.send({
          success: false,
          message: "Server Error in finding Quiz in DB"
        });
      }

      let errorCheck = 0;
      docs.result.forEach((result)=>{
        if(result.regNo === regNo && result.quiz_id === quiz_id) {
          errorCheck = 1;
        }
      });

      if(errorCheck === 1) {
        return res.send({
          success: false,
          message: 'Answer already registered'
        });
      }

      docs.quiz.forEach((quiz)=>{
        if(quiz._id == quiz_id) {
          if(quiz.answer == value) {
            docs.result.push({
              regNo: regNo,
              quiz_id: quiz_id,
              correct: true,
              value: value
            });
          } else {
            docs.result.push({
              regNo: regNo,
              quiz_id: quiz_id,
              correct: false,
              value: value
            });
          }
        }
      });
      docs.save((err)=>{
        if(err) {
          return res.send({
            success: false,
            message: "Server Error in Saving Data"
          });
        } else {
          return res.send({
            success: true,
            message: "Successfully submitted"
          });
        }
      });
    });
  });

  app.post('/api/facultyaccount/getQuizDetails', (req, res, next)=>{

    QuizSchema.find({}, (err, docs)=>{
      if(err) {
        return res.send({
          success: false,
          message: "Server Error in Retreiving Data"
        });
      } else {
        return res.send({
          success: true,
          data: docs
        });
      }
    });

  });

  app.post('/api/facultyaccount/setvisibility', (req, res, next)=>{
    const { body } = req;
    const { semester, branch, sec, isVisible } = body;

    QuizSchema.findOneAndUpdate({
      branch: branch,
      semester: semester,
      sec: sec
    }, {
      $set: { isVisible: isVisible }
    }, null, (err)=>{
      if(err) {
        return res.send({
          success: false,
          message: "Unable to change visibility"
        });
      } else {
        return res.send({
          success: true
        });
      }
    });
  });

  app.post('/api/facultyaccount/deletequiz', (req, res, next)=>{
    const { body } = req;
    const { branch, semester, sec } = body;

    QuizSchema.findOneAndRemove({
      branch: branch,
      semester: semester,
      sec: sec
    }, (err)=>{
      if(err) {
        return res.send({
          success: false,
          message: "Server Error in Deleting Quiz"
        });
      } else {
        return res.send({
          success: true
        });
      }
    });
  });

  app.post('/api/facultyaccount/setnoofstudentsquiz', (req, res, next)=>{
    const { body } = req;
    const { semester, branch, sec, noofstudents } = body;


    QuizSchema.findOneAndUpdate({
      semester: semester,
      branch: branch,
      sec: sec
    }, {
      $set: { noofstudents: noofstudents }
    }, null, (err)=>{
      if(err) {
        return res.send({
          success: false,
          message: "Server Error in saving data in quiz schema in DB"
        });
      } else {
        return res.send({
          success: true,
          message: "Saved Successfully"
        });
      }
    });

  });

  app.post('/api/facultyaccount/updatepassword', (req, res, next)=>{
    const { body } = req;
    const { empId, password } = body;

    Faculty.findOne({
      empId: empId
    }, (err, docs)=>{
      if(err) {
        return res.send({
          success: false,
          message: "Server Error"
        });
      }
      if(!docs) {
        return res.send({
          success: false,
          message: "User Not Found"
        });
      }

      docs.password = docs.generateHash(password);
      docs.save((err)=>{
        if(err) {
          return res.send({
            success: false,
            message: "Server Error in Saving Password"
          });
        } else {
          return res.send({
            success: true,
            message: "Successfully saved"
          });
        }
      });
    });
  });

  app.post('/api/facultyaccount/setcgpa', (req, res, next)=>{
    const { body } = req;
    const { branch, semester } = body;

    StudentAcademicDetail.find({
      branch: branch,
      currentsem: semester
    }, (err, docs)=>{
        if(err) {
          return res.send({
            success: false,
            message: "Server Error in finding student Details"
          });
        } else {
          return res.send({
            success: true,
            data: docs
          });
        }
    });

  });

  app.post('/api/facultyaccount/updatestudentcgpa', (req, res, next)=>{
    const { body } = req;
    const { jsonAcademicDetail } = body;

    let errorCheck = 0;

    jsonAcademicDetail.forEach((student)=>{
      StudentAcademicDetail.findOneAndUpdate({
        regNo: student.regNo,
      }, {
        $set: { cgpa: student.cgpa }
      }, null, (err)=>{
        if(err) {
          errorCheck = 1;
        }
      });
    });

    if(errorCheck === 0) {
      return res.send({
        success: true,
        message: "Successfully Updated"
      });
    } else {
      return res.send({
        success: false,
        message: "Update Not Successfull"
      });
    }

  });
}
