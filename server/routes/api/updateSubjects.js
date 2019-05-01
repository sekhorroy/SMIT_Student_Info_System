const SemesterSubjectSchema = require('../../models/SemesterSubjectDetail');
const StudentAcademicDetail = require('../../models/StudentAcademics');

module.exports = (app) => {

  app.post('/api/facultyaccount/addcourses', (req, res, next)=>{
    const { body } = req;
    const { branch, semester, coursename, coursecode } = body;

    if(!coursename || !coursecode || !semester) {
      return res.send({
        success: false,
        message: "please enter the details necessary"
      })
    }

    SemesterSubjectSchema.find({
      branch: branch,
      semester: semester,
    }, (err, subjects)=>{
      if(err) {
        return res.send({
          success: false,
          message: 'Server Error: in adding course'
        });
      } else {
        if(subjects.length === 0) {
          //add new subject document
          let newSemesterSubjectSchema = new SemesterSubjectSchema();
          newSemesterSubjectSchema.branch = branch;
          newSemesterSubjectSchema.semester = semester;
          let newSubjectDetailSchema = {
            subjectname: coursename,
            subjectcode: coursecode
          }
          newSemesterSubjectSchema.subject.push(newSubjectDetailSchema);
          newSemesterSubjectSchema.save((err)=>{
            if(err) {
              return res.send({
                success: false,
                message: 'Error: server error in saving subject detail'
              });
            } else {
              return res.send({
                success: true,
                message: 'successfully subject add'
              });
            }
          });
        } else {
            let newSubjectDetailSchema = {
              subjectname: coursename,
              subjectcode: coursecode
            }
            subjects[0].subject.push(newSubjectDetailSchema);
            subjects[0].save((err)=>{
              if(err) {
                return res.send({
                  success: false,
                  message: 'Update add course failed'
                });
              } else {
                return res.send({
                  success: true,
                  message: 'successfully subject add'
                });
              }
            });
        }
      }
    });
  });

  app.post('/api/facultyaccount/addlabs', (req, res, next)=>{
    const { body } = req;
    const { branch, semester, coursename, coursecode } = body;

    if(!coursecode || !coursename || !semester || !branch) {
      return res.send({
        success: false,
        message: "please enter necessary details"
      });
    }

    SemesterSubjectSchema.find({
      branch: branch,
      semester: semester
    }, (err, subject)=>{
      if(err) {
        return res.send({
          success: false,
          message: "server error in adding labs"
        });
      }

      if(subject.length == 0) {
        let newSemesterSubjectSchema = new SemesterSubjectSchema();
        newSemesterSubjectSchema.branch = branch;
        newSemesterSubjectSchema.semester = semester;
        let newSubjectDetailSchema = {
          subjectname: coursename,
          subjectcode: coursecode,
        }
        newSemesterSubjectSchema.lab.push(newSubjectDetailSchema);
        newSemesterSubjectSchema.save((err)=>{
          if(err) {
            return res.send({
              success: false,
              message: "Server error in saving"
            });
          } else {
            return res.send({
              success: true,
              message: "Successfully saved data"
            });
          }
        });
      } else {
        let newSubjectDetailSchema = {
          subjectname: coursename,
          subjectcode: coursecode
        }
        subject[0].lab.push(newSubjectDetailSchema);
        subject[0].save((err)=>{
          if(err) {
            return res.send({
              success: false,
              message: "updated labs failed"
            });
          } else {
            return res.send({
              success: true,
              message: "update lab Successfully"
            });
          }
        });
      }
    });
  });

  app.post('/api/facultyaccount/deletelabs', (req, res, next)=>{
    const { body } = req;
    const { coursecode, semester, branch } = body;

    if(!coursecode || !semester || !branch) {
      return res.send({
        success: false,
        message: "required values are not provided"
      });
    }

    SemesterSubjectSchema.findOneAndUpdate({
      semester: semester,
      branch: branch
    }, {
      $pull: {lab: {subjectcode: coursecode}}
    }, {
      safe: true
    }, (err)=>{
      if(err) {
        return res.send({
          success: false,
          message: "Server Error in deleting labs"
        });
      } else {
        return res.send({
          success: true,
          message: "Lab deleted successfully"
        });
      }
    })
  });

  app.post('/api/facultyaccount/addelectivecourses', (req, res, next)=>{
    const { body } = req;
    const { branch, cse, semester, coursename, coursecode, seatsavailable } = body;

    if(!coursename || !coursecode || !semester || !seatsavailable) {
      return res.send({
        success: false,
        message: "please enter the details necessary"
      })
    }


    SemesterSubjectSchema.find({
      branch: branch,
      semester: semester,
    }, (err, subjects)=>{
      if(err) {
        return res.send({
          success: false,
          message: 'Server Error: in adding course'
        });
      } else {
        if(subjects.length === 0) {
          //add new subject document
          let newSemesterSubjectSchema = new SemesterSubjectSchema();
          newSemesterSubjectSchema.branch = branch;
          newSemesterSubjectSchema.semester = semester;
          let newSubjectDetailSchema = {
            subjectname: coursename,
            subjectcode: coursecode,
            seatsavailable: seatsavailable
          }
          newSemesterSubjectSchema.electivesubject.push(newSubjectDetailSchema);
          newSemesterSubjectSchema.save((err)=>{
            if(err) {
              return res.send({
                success: false,
                message: 'Error: server error in saving subject detail'
              });
            } else {
              return res.send({
                success: true,
                message: 'successfully subject add'
              });
            }
          });
        } else {
            let newSubjectDetailSchema = {
              subjectname: coursename,
              subjectcode: coursecode,
              seatsavailable: seatsavailable
            }
            subjects[0].electivesubject.push(newSubjectDetailSchema);
            subjects[0].save((err)=>{
              if(err) {
                return res.send({
                  success: false,
                  message: 'Update add course failed'
                });
              } else {
                return res.send({
                  success: true,
                  message: 'successfully subject add'
                });
              }
            });
        }
      }
    });
  });

  app.post('/api/facultyaccount/deletecourses', (req, res, next)=>{
    const { body } = req;
    const { coursecode, semester, branch } = body;

    SemesterSubjectSchema.findOneAndUpdate({
      semester: semester,
      branch: branch
    }, {
      $pull: {subject: { subjectcode: coursecode}}
    }, {
      safe: true
    }, (err)=>{
      if(err) {
        return res.send({
          success: false,
          message: 'Server Error in deleting course'
        });
      } else {
        return res.send({
          success: true,
          message: 'Course deleted successfully'
        });
      }
    });

  });

  app.post('/api/facultyaccount/deleteelectivecourses', (req, res, next)=>{
    const { body } = req;
    const { coursecode, semester, branch } = body;

    SemesterSubjectSchema.findOneAndUpdate({
      semester: semester,
      branch: branch
    }, {
      $pull: {electivesubject: { subjectcode: coursecode}}
    }, {
      safe: true
    }, (err)=>{
      if(err) {
        return res.send({
          success: false,
          message: 'Server Error in deleting course'
        });
      } else {
        return res.send({
          success: true,
          message: 'Course deleted successfully'
        });
      }
    });

  });

  app.post('/api/facultyaccount/getsubjectsbysemester', (req, res, next)=>{
    const { body } = req;
    const { branch, semester } = body;

    SemesterSubjectSchema.findOne({
      branch: branch,
      semester: semester
    }, (err, subject)=>{
      if(err) {
        return res.send({
          success: true,
          message: 'Server Error: In fetching subject data'
        });
      } else {
        return res.send({
          success: true,
          message: 'Subject detail successfully fetch',
          data: subject
        });
      }
    });
  });

  app.post('/api/facultyaccount/controlelectivesubject', (req, res, next)=>{
    const { body } = req;
    const { branch, semester, totalelectivesubjects } = body;

    if(!semester || !totalelectivesubjects) {
      return res.send({
        success: false,
        message: "please enter the required fields"
      });
    }

    SemesterSubjectSchema.findOneAndUpdate({
      branch: branch,
      semester: semester
    }, {
      $set: {  totalelectivesubjects: totalelectivesubjects  }
    }, null, (err, doc)=>{
      if(err) {
        return res.send({
          success: false,
          message: "Server error in Updating elective courses number"
        });
      } else {
        return res.send({
          success: true,
          message: "successfull updated no of elective course"
        });
      }
    })
  });

  app.post('/api/facultyaccount/allocateelectivesubject', (req, res, next)=>{
    const { body } = req;
    const { semester, branch } = body;

    if(!semester) {
      return res.send({
        success: false
      });
    }


    let errorCheck = 0;
    //fetch the subject type
    SemesterSubjectSchema.findOne({
      semester: semester,
      branch: branch
    }, 'electivesubject totalelectivesubjects -_id', (err, docs)=>{
      if(err) {
        return res.send({
          success: false,
          message: "Server Error: Fetch semester subject details failed"
        });
      } else {
        //docs is the elevtive subject array of elective subjects and the totalelectivesubjects
        //fetch the student academic detail sort 'des'
        StudentAcademicDetail.find({
          branch: branch,
          currentsem: semester
        }).sort({cgpa: -1}).exec((err, student)=>{
          if(err) {
            return res.send({
              success: false,
            });
          }
          else {
            /*=
            return res.send({
              data: student
            });
            */
            //student is the student academic data in array of objects
            student.forEach((student)=>{
              if(student.isAutoAssigned != true){
                let i=0;
                student.chooseelective.forEach((chooseelective, index1)=>{
                  if(i === docs.totalelectivesubjects) {
                    return;
                  }

                  docs.electivesubject.forEach((electivesubject, index2)=>{
                    if(electivesubject.seatsavailable === 0) {
                      return;
                    }
                    if(electivesubject.subjectcode === chooseelective.subjectcode){
                      docs.electivesubject[index2].seatsavailable--;
                      student.subject.push({
                        subjectname: docs.electivesubject[index2].subjectname,
                        subjectcode: docs.electivesubject[index2].subjectcode
                      });
                      i++;
                    }
                  });

                });
              } else {
                return;
              }
            });

            student.forEach((student)=>{
              if(student.isAutoAssigned != true){
                StudentAcademicDetail.findOne({
                  regNo: student.regNo
                }, (err, docs)=>{
                  if(err) {
                    errorCheck = 1;
                  } else {
                    docs.subject=student.subject;
                    docs.isAutoAssigned = true;
                    docs.save();
                  }
                });
              } else {
                return;
              }
            });

            SemesterSubjectSchema.findOne({
              branch: branch,
              semester: semester
            }, (err, doc)=>{
              if(err) {
                errorCheck = 1;
              } else {
                doc.electivesubject = docs.electivesubject
                doc.totalelectivesubjects = docs.totalelectivesubjects
                doc.save();
              }
            });

            if(errorCheck === 0){
              return res.send({
                success: true,
                student: student,
                subject: docs
              });
            } else {
              return res.send({
                success: false
              });
            }
          }
        });
      }
    });
  });

  app.post('/api/facultyaccount/resetsemesteracademicdetail', (req, res, next)=>{
    const { body } = req;
    const { branch, semester } = body;

    if(!branch || !semester) {
      return res.send({
        success: false,
        message: "Enter branch and semester details"
      });
    }

    let errorCheck = 0;

    StudentAcademicDetail.find({
      branch: branch,
      currentsem: semester
    }, (err, studentdetail_array)=>{
      if(err) {
        return res.send({
          success: false,
          message: "Server Error in reseting academic details"
        });
      } else {
        if(studentdetail_array.length > 0) {
          studentdetail_array.forEach((student)=>{
            student.subject = [];
            student.chooseelective = [];
            student.lab = [];
            student.isAutoAssigned = false;
            student.save((err)=>{
              if(err) {
                errorCheck = 1;
              }
            });
          });

          if(errorCheck === 0) {
            return res.send({
              success: true,
              message: "semester details reset successfull"
            });
          }
        } else {
          return res.send({
            success: false,
            message: "Server error in finding student details"
          });
        }
      }
    });
  });
}
