const mongoose = require('mongoose');
const Faculty = require('../../models/Faculty');
const StudentDetail = require('../../models/StudentDetail');
//import { SemesterWiseFeeStructureSchema } from '../../models/FeeStructureCommon';
const StudentAcademicDetail = require('../../models/StudentAcademics');
const FeeStructureCommonSchema = require('../../models/FeeStructureCommon');
const FeeDetail = require('../../models/FeeDetail');
const Student = require('../../models/User');
module.exports = (app) => {
  app.post('/api/adminaccount/getstudentdetails', (req, res, next)=>{
    const { body } = req;
    const { currentsem } = body;

    StudentDetail.find({
      currentsem: currentsem
    }, (err, users)=>{
      if(err) {
        return res.send({
          success: false,
          message: "Server Error: in finding student detail"
        });
      }
      if(users.length>0) {
        return res.send({
          success: true,
          message: "successfull",
          data: users
        });
      } else {
        return res.send({
          success: false,
          message: "not successfull",
        });
      }
    });

  });

  app.post('/api/adminaccount/insertnewstudentdetails', (req, res, next)=>{
    const { body } = req;
    const { jsonStudentData, jsonStudentAcademicData, jsonStudentFeeDetail } = body;

    let errorCheck = 0;
    /*
    StudentDetail.collection.insert(jsonStudentData, (err, docs)=>{
        if(err) {
          return res.send({
            success: false,
            message: "Server Error in saving student academic detail",
            data: err
          });
        } else {
            const { insertedIds } = docs;
            Object.keys(insertedIds).forEach((key, idx)=>{
              //console.log(insertedIds[key]);


              StudentDetail.findById(insertedIds[key], (err, student)=>{

                if(err) {
                  return res.send({
                    success: false,
                    message: "Could not find the student detail in DB"
                  });
                }


                let newUser = new Student();
                newUser.regNo = student.regNo;
                newUser.password = newUser.generateHash("password");

                //fee func call
                let newFeeUser = new FeeDetail();
                newFeeUser.regNo = student.regNo;
                newFeeUser.save((err, doc)=>{
                  if(err) {
                    return res.send({
                      success: false,
                      message: "Server Error in saving Fee data"
                    });
                  } else {
                    newUser.feedetail_id = doc._id;
                  }
                });

                //academic func call
                let newAcademicUser = new StudentAcademicDetail();
                newAcademicUser.regNo = student.regNo;
                newAcademicUser.currentsem = student.currentsem;
                newAcademicUser.sec = student.sec;

                newAcademicUser.save((err, doc)=>{
                  if(err) {
                    return res.send({
                      success: false,
                      message: "Server Error in saving academic data"
                    });
                  } else {
                    newUser.studentacademicdetail_id = doc._id;
                  }
                });





                newUser.studentdetail_id = insertedIds[key];
                newUser.save((err)=>{
                  if(err) {
                    return res.send({
                      success: false,
                      message: "Server could not save new USER"
                    });
                  } else {
                    return res.send({
                      success: true,
                      messgage: "Successfully saved user data"
                    });
                  }
                });


              });
            });
        }

    });
    */



    jsonStudentAcademicData.forEach((student)=>{
      Student.findOne({
        regNo: student.regNo
      }, (err, doc)=>{
        if(err) {
          errorCheck = 1;
        }
        if(doc){
          //do nothing
        } else {
          let newUser = new Student();
          newUser.regNo = student.regNo;
          newUser.password = newUser.generateHash("password");
          newUser.save((err)=>{
            if(err) {
              errorCheck = 1;
            }
          });
        }
      });

    });


    jsonStudentData.forEach((student)=>{
      StudentDetail.findOne({
        regNo: student.regNo
      }, (err, doc)=>{
        if(err){

        }
        if(doc) {

        } else {
          let newAcademicUser = new StudentDetail();
          newAcademicUser.name = student.name;
          newAcademicUser.regNo = student.regNo;
          newAcademicUser.currentsem = student.currentsem;
          newAcademicUser.course = student.course;
          newAcademicUser.branch = student.branch;
          newAcademicUser.sec = student.sec;
          newAcademicUser.tg = student.tg;
          newAcademicUser.tg_contact = student.tg_contact;
          newAcademicUser.save((err, docs)=>{
            if(err) {
              errorCheck = 4;
            } else {
              Student.findOneAndUpdate({
                regNo: student.regNo
              }, {
                $set: { studentdetail_id: docs._id }
              }, null, (err)=>{
                if(err) {
                  errorCheck = 4;
                }
              });
            }
          });
        }
      });
    });

    if(errorCheck === 1) {
      return res.send({
        success: false,
        message: "could not create user"
      });
    }


    jsonStudentData.forEach((student)=>{
        StudentAcademicDetail.findOne({
          regNo: student.regNo
        }, (err, doc)=>{
          if(err) {

          }
          if(doc) {
            //do nothing
          } else {
            let newStudentAcademic = new StudentAcademicDetail();
            newStudentAcademic.regNo = student.regNo;
            newStudentAcademic.currentsem = student.currentsem;
            newStudentAcademic.sec = student.sec;
            newStudentAcademic.branch = student.branch;

            newStudentAcademic.save((err, docs)=>{
              if(err) {
                errorCheck = 2;
              } else {
                Student.findOneAndUpdate({
                  regNo: student.regNo
                }, {
                  $set: { studentacademicdetail_id: docs._id }
                }, null, (err)=>{
                  if(err) {
                    errorCheck = 4;
                  }
                });
              }
            });

            FeeStructureCommonSchema.findOne({
              course: student.course,
              branch: student.branch
            }, (err, len)=>{
              if(err) {
                errorCheck=2;
              }
              if(!len) {
                errorCheck=2;
              }
              let length = len.semester_fee.length;

              let newStudentFee = new FeeDetail();
              newStudentFee.regNo = student.regNo;
              let i = 1;
              while(i<=length) {
                newStudentFee.semester_fee.push({
                  semester: i
                });
                i++;
              }
              newStudentFee.save((err, docs)=>{
                if(err) {
                  errorCheck = 3;
                } else {
                  Student.findOneAndUpdate({
                    regNo: student.regNo
                  }, {
                    $set: { feedetail_id: docs._id }
                  }, null, (err)=>{
                    if(err) {
                      errorCheck = 4;
                    }
                  });
                }
              });
              
            });


          }
        });
    });




    if(errorCheck === 0) {
      return res.send({
        success: true,
        message: "user saved successfully"
      });
    } else {
      return res.send({
        success: false,
        message: "failed to save new user"
      });
    }

  });

  app.post('/api/adminaccount/insertnewstudentdetailmanual', (req, res, next)=>{
    const { body } = req;
    const { name, regNo, course, semester, branch, sec, tg, tg_contact } = body;

    Student.findOne({
      regNo: regNo
    }, (err, docs)=>{
      if(err) {
        return res.send({
          success: false,
          message: 'Server Error in finding user'
        });
      }
      if(docs) {
        return res.send({
          success: false,
          message: 'User already exist'
        });
      } else {
        //Student Schema
        let student = new Student();
        student.regNo = regNo;
        student.password = student.generateHash("password");
        student.save((err)=>{
          if(err) {
            return res.send({
              success: false,
              message: 'Server Error in creating new user'
            });
          }
        });

        //student_academic_details
        let studentacademic = new StudentAcademicDetail();
        studentacademic.regNo = regNo;
        studentacademic.branch = branch;
        studentacademic.course = course;
        studentacademic.currentsem = semester;
        studentacademic.sec = sec;
        studentacademic.subject = [];
        studentacademic.lab = [];
        studentacademic.chooseelective = [];
        studentacademic.save((err, doc)=>{
          if(err) {
            return res.send({
              success: false,
              message: "Server Error in saving new data"
            });
          }

          Student.findOneAndUpdate({
            regNo: regNo
          }, {
            $set: { studentacademicdetail_id: doc._id }
          }, null, (err)=>{
            if(err) {
              return res.send({
                success: false,
                message: "Server Error in saving new data"
              });
            }
          });

          FeeStructureCommonSchema.findOne({
            course: course,
            branch: branch
          }, (err, fee)=>{
            if(err) {
              return res.send({
                success: false,
                message: "Server Error in getting semester length"
              });
            }
            if(!fee) {
              return res.send({
                success: false,
                message: "Server Error in getting semester length"
              });
            }

            let length = fee.semester_fee.length;
            let newStudentFee = new FeeDetail();
            newStudentFee.regNo = regNo;
            let i = 1;
            while(i<=length) {
              newStudentFee.semester_fee.push({
                semester: i
              });
              i++;
            }

            newStudentFee.save((err, doc)=>{
              if(err) {
                return res.send({
                  success: false,
                  message: "Server Error in saving new data"
                });
              }

              Student.findOneAndUpdate({
                regNo: regNo
              }, {
                $set: { feedetail_id: doc._id }
              }, null, (err)=>{
                if(err) {
                  return res.send({
                    success: false,
                    message: "Server Error in saving new data"
                  });
                }
              });
            });

          });




          let newStudentDetail = new StudentDetail();
          newStudentDetail.name = name;
          newStudentDetail.regNo = regNo;
          newStudentDetail.course = course;
          newStudentDetail.branch = branch;
          newStudentDetail.currentsem = semester;
          newStudentDetail.tg = tg;
          newStudentDetail.tg_contact = tg_contact;
          newStudentDetail.save((err, doc)=>{
            if(err) {
              return res.send({
                success: false,
                message: "Server Error in saving new data"
              });
            }

            Student.findOneAndUpdate({
              regNo: regNo
            }, {
              $set: { studentdetail_id: doc._id }
            }, null, (err)=>{
              if(err) {
                return res.send({
                  success: false,
                  message: "Server Error in saving new data"
                });
              }
            });
          });
        });
        return res.send({
          success: true,
        });
      }
    });


  });

  app.post('/api/adminaccount/insertnewfaculty', (req, res, next)=>{
    const { body } = req;
    const { empId, password, branch } = body;

    Faculty.findOne({
      empId: empId
    }, (err, docs)=>{
      if(err) {
        return res.send({
          success: false,
          message: 'Server Error in verifying user'
        });
      } else {
        if(docs) {
          return res.send({
            success: false,
            message: 'Faculty User with given EmpID exist'
          });
        }

        const facultyUser = new Faculty();
        facultyUser.empId = empId;
        facultyUser.password = facultyUser.generateHash(password);
        facultyUser.branch = branch;

        facultyUser.save((err)=>{
          if(err) {
            return res.send({
              success: false,
              message: 'Server Error in saving new Faculty User'
            });
          }

          return res.send({
            success: true,
            message: 'Successfully created Faculty User'
          });
        });
      }
    });
  });

  app.post('/api/adminaccount/getfacultydata', (req, res, next)=>{
    const { body } = req;
    const { branch } = body;

    Faculty.find({
      branch: branch
    }, (err, docs)=>{
      if(err) {
        return res.send({
          success: false,
          message: "Server Error in handling faculty data"
        });
      } else {
        return res.send({
          success: true,
          data: docs
        });
      }
    });
  });

  app.post('/api/adminaccount/removefaculty', (req, res, next)=>{
    const { body } = req;
    const { empId } = body;

    Faculty.findOneAndDelete({
      empId: empId
    }, (err)=>{
      if(err) {
        return res.send({
          success: false,
          message: "Server Error in Deleting Faculty User"
        });
      }

      return res.send({
        success: true,
        message: "Faculty User deleted successfully"
      });
    });

  });

  app.post('/api/adminaccount/addnewfeestructure', (req, res, next)=>{
    const { body } = req;
    const { course, branch, noofsemester } = body;

    FeeStructureCommonSchema.findOne({
      course: course,
      branch: branch,
    }, (err, docs)=>{
      if(err) {
        return res.send({
          success:false,
          message: "Server Error in Inserting new Fee structure"
        });
      }
      if(docs) {
        return res.send({
          success:false,
          message: "Fee Structure already exist"
        });
      } else {
        let feeSchema = new FeeStructureCommonSchema();
        feeSchema.course = course;
        feeSchema.branch = branch;

        let i = 1;
        while(i<=noofsemester) {
          feeSchema.semester_fee.push({
            semester: i
          });
          i++;
        }

        feeSchema.save((err)=>{
          if(err) {
            return res.send({
              success: false,
              message: "Server Error in saving new fee structure"
            });
          } else {
            return res.send({
              success: true,
              message: "Successully Saved"
            });
          }
        })
      }
    });
  });

  app.post('/api/adminaccount/removefeestructure', (req, res, next)=>{
    const { body } = req;
    const { course, branch } = body;

    FeeStructureCommonSchema.findOneAndDelete({
      course: course,
      branch: branch
    }, (err)=>{
      if(err) {
        return res.send({
          success: false,
          message: "Server Error in Removing fee Structure"
        });
      } else {
        return res.send({
          success: true,
          message: "Remove Successfully"
        });
      }
    });
  });

  app.post('/api/adminaccount/searchfeedetail', (req, res, next)=>{
    const { body } = req;
    const { course, branch } = body;

    FeeStructureCommonSchema.findOne({
      course: course,
      branch: branch
    }, (err, docs)=>{
      if(err) {
        return res.send({
          success: false,
          message: "Server Error in find data"
        });
      }

      if(!docs) {
        return res.send({
          success: false,
          message: "Not Data Found in DB"
        });
      }

      return res.send({
        success: true,
        data: docs
      });

    });
  });

  app.post('/api/adminaccount/updatefeestructure', (req, res, next)=>{
    const { body } = req;
    const { feedetail } = body;

    const { course, branch, semester_fee } = feedetail;

    FeeStructureCommonSchema.findOneAndUpdate({
      course: course,
      branch: branch,
    }, {
      $set: { semester_fee: semester_fee }
    }, null, (err)=>{
      if(err) {
        return res.send({
          success: false,
          message: "Server Error in Updating Fee Structure"
        });
      }
      return res.send({
          success: true,
          message: "Successfully Updated"
      });
    });
  });
}
