const mongoose = require('mongoose');
const StudentDetail = require('../../models/StudentDetail');
const FeeDetail = require('../../models/FeeDetail');
const StudentAcademicDetail = require('../../models/StudentAcademics');
const Student = require('../../models/User');

module.exports = (app) => {
  app.post('/api/account/insertdetails', (req, res, next)=>{
          const { body } = req;
          const { name, regNo, course, currentsem, branch, tg, tg_contact } = body;

          if (!name){
            return res.send({
              success: false,
              message: 'Error! name cannot be blank.'
            });
          }
          if (!regNo){
            return res.send({
              success: false,
              message: 'Error! regNo cannot be blank.'
            });
          }
          if (!course){
            return res.send({
              success: false,
              message: 'Error! course cannot be blank.'
            });
          }
          if (!currentsem){
            return res.send({
              success: false,
              message: 'Error! currentsem cannot be blank.'
            });
          }
          /*
          if (!tg){
            return res.send({
              success: false,
              message: 'Error! tg cannot be blank.'
            });
          }
          if (!tg_contact){
            return res.send({
              success: false,
              message: 'Error! tg_contact cannot be blank.'
            });
          }
          */

          // find existing user matched the reg no
          StudentDetail.find({
            regNo: regNo
          },(err, prevUsers)=>{
            if(err) {
              return res.send({
                success: false,
                message: "Error: server finding error"
              });
            }
            if(prevUsers.length>=1) {
              //update the new data
            }
            else {
              let newUser = new StudentDetail();
              newUser.name=name;
              newUser.regNo =regNo;
              newUser.course=course;
              newUser.currentsem=currentsem;
              newUser.branch=branch;
              newUser.tg=tg;
              newUser.tg_contact=tg_contact;
              newUser.save((err, user)=>{
                if(err){
                  return res.send({
                    success: false,
                    message: 'Server error couldnot save'
                  });
                } else {

                  Student.findOneAndUpdate({
                    regNo: regNo
                  }, {
                    $set: { studentdetail_id: user.id}
                  }, null, (err)=>{
                    if(err) {
                      return res.send({
                        success: false,
                        message: 'Error: insert student details id matching failed'
                      });
                    }
                  });

                  return res.send({
                    success: true,
                    message: 'New Details save successfully'
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
  app.post('/api/account/insertfeedetails', (req, res, next)=>{
      const { body } = req;
      const { currentsem, regNo, coursefee, hostelfee, messfee, otherfee, dayscholar } = body;

      if(!currentsem || !regNo || !coursefee || !hostelfee || !messfee) {
        return res.send({
          success: false,
          message: 'Error: FEE Details not correct'
        });
      }

      FeeDetail.find({
        regNo: regNo
      }, (err, details)=>{
        if(err){
          return res.send({
            success: false,
            message: 'Error: the server could not locate the requested fee details'
          });
        }
        if(details.length>=1){
          //Update the fee structures
            if(currentsem === "1"){
              FeeDetail.findOneAndUpdate({
                regNo: regNo
              }, {
                $set: {
                  "firstsem.coursefee": coursefee,
                  "firstsem.hostelfee": hostelfee,
                  "firstsem.messfee": messfee,
                  "firstsem.otherfee": otherfee
                }
              }, null, (err, detail)=>{
                if(err){
                  return res.send({
                    success: false,
                    message: "Error: update could not complete"
                  })
                } else {
                  return res.send({
                    success: true,
                    message: "Update successfull"
                  })
                }
              });
            }

            if(currentsem === "2"){
              FeeDetail.findOneAndUpdate({
                regNo: regNo
              }, {
                $set: {
                  "secondsem.coursefee": coursefee,
                  "secondsem.hostelfee": hostelfee,
                  "secondsem.messfee": messfee,
                  "secondsem.otherfee": otherfee
                }
              }, null, (err, detail)=>{
                if(err){
                  return res.send({
                    success: false,
                    message: "Error: update could not complete"
                  })
                } else {
                  return res.send({
                    success: true,
                    message: "Update successfull"
                  })
                }
              });
            }

            if(currentsem === "3"){
              FeeDetail.findOneAndUpdate({
                regNo: regNo
              }, {
                $set: {
                  "thirdsem.coursefee": coursefee,
                  "thirdsem.hostelfee": hostelfee,
                  "thirdsem.messfee": messfee,
                  "thirdsem.otherfee": otherfee
                }
              }, null, (err, detail)=>{
                if(err){
                  return res.send({
                    success: false,
                    message: "Error: update could not complete"
                  })
                } else {
                  return res.send({
                    success: true,
                    message: "Update successfull"
                  })
                }
              });
            }

            if(currentsem === "4"){
              FeeDetail.findOneAndUpdate({
                regNo: regNo
              }, {
                $set: {
                  "fourthsem.coursefee": coursefee,
                  "fourthsem.hostelfee": hostelfee,
                  "fourthsem.messfee": messfee,
                  "fourthsem.otherfee": otherfee
                }
              }, null, (err, detail)=>{
                if(err){
                  return res.send({
                    success: false,
                    message: "Error: update could not complete"
                  })
                } else {
                  return res.send({
                    success: true,
                    message: "Update successfull"
                  })
                }
              });
            }

            if(currentsem === "5"){
              FeeDetail.findOneAndUpdate({
                regNo: regNo
              }, {
                $set: {
                  "fifthsem.coursefee": coursefee,
                  "fifthsem.hostelfee": hostelfee,
                  "fifthsem.messfee": messfee,
                  "fifthsem.otherfee": otherfee
                }
              }, null, (err, detail)=>{
                if(err){
                  return res.send({
                    success: false,
                    message: "Error: update could not complete"
                  })
                } else {
                  return res.send({
                    success: true,
                    message: "Update successfull"
                  })
                }
              });
            }

            if(currentsem === "6"){
              FeeDetail.findOneAndUpdate({
                regNo: regNo
              }, {
                $set: {
                  "sixthsem.coursefee": coursefee,
                  "sixthsem.hostelfee": hostelfee,
                  "sixthsem.messfee": messfee,
                  "sixthsem.otherfee": otherfee
                }
              }, null, (err, detail)=>{
                if(err){
                  return res.send({
                    success: false,
                    message: "Error: update could not complete"
                  })
                } else {
                  return res.send({
                    success: true,
                    message: "Update successfull"
                  })
                }
              });
            }

            if(currentsem === "7"){
              FeeDetail.findOneAndUpdate({
                regNo: regNo
              }, {
                $set: {
                  "seventhsem.coursefee": coursefee,
                  "seventhsem.hostelfee": hostelfee,
                  "seventhsem.messfee": messfee,
                  "seventhsem.otherfee": otherfee
                }
              }, null, (err, detail)=>{
                if(err){
                  return res.send({
                    success: false,
                    message: "Error: update could not complete"
                  })
                } else {
                  return res.send({
                    success: true,
                    message: "Update successfull"
                  })
                }
              });
            }

            if(currentsem === "8"){
              FeeDetail.findOneAndUpdate({
                regNo: regNo
              }, {
                $set: {
                  "eightsem.coursefee": coursefee,
                  "eightsem.hostelfee": hostelfee,
                  "eightsem.messfee": messfee,
                  "eightsem.otherfee": otherfee
                }
              }, null, (err, detail)=>{
                if(err){
                  return res.send({
                    success: false,
                    message: "Error: update could not complete"
                  })
                } else {
                  return res.send({
                    success: true,
                    message: "Update successfull"
                  })
                }
              });
            }

        } else {
          //Create a new document for the user
            let newFeeDetail = new FeeDetail();
            newFeeDetail.regNo= regNo;

            if(currentsem === "1"){
              newFeeDetail.firstsem.coursefee = coursefee;
              newFeeDetail.firstsem.hostelfee = hostelfee;
              newFeeDetail.firstsem.messfee = messfee;
              newFeeDetail.firstsem.otherfee = otherfee;
            }
            if(currentsem === "2"){
              newFeeDetail.secondsem.coursefee = coursefee;
              newFeeDetail.secondsem.hostelfee = hostelfee;
              newFeeDetail.secondsem.messfee = messfee;
              newFeeDetail.secondsem.otherfee = otherfee;
            }
            if(currentsem === "3"){
              newFeeDetail.thirdsem.coursefee = coursefee;
              newFeeDetail.thirdsem.hostelfee = hostelfee;
              newFeeDetail.thirdsem.messfee = messfee;
              newFeeDetail.thirdsem.otherfee = otherfee;
            }
            if(currentsem === "4"){
              newFeeDetail.fourthsem.coursefee = coursefee;
              newFeeDetail.fourthsem.hostelfee = hostelfee;
              newFeeDetail.fourthsem.messfee = messfee;
              newFeeDetail.fourthsem.otherfee = otherfee;
            }
            if(currentsem === "5"){
              newFeeDetail.fifthsem.coursefee = coursefee;
              newFeeDetail.fifthsem.hostelfee = hostelfee;
              newFeeDetail.fifthsem.messfee = messfee;
              newFeeDetail.fifthsem.otherfee = otherfee;
            }
            if(currentsem === "6"){
              newFeeDetail.sixthsem.coursefee = coursefee;
              newFeeDetail.sixthsem.hostelfee = hostelfee;
              newFeeDetail.sixthsem.messfee = messfee;
              newFeeDetail.sixthsem.otherfee = otherfee;
            }
            if(currentsem === "7"){
              newFeeDetail.seventhsem.coursefee = coursefee;
              newFeeDetail.seventhsem.hostelfee = hostelfee;
              newFeeDetail.seventhsem.messfee = messfee;
              newFeeDetail.seventhsem.otherfee = otherfee;
            }
            if(currentsem === "8") {
              newFeeDetail.eightsem.coursefee = coursefee;
              newFeeDetail.eightsem.hostelfee = hostelfee;
              newFeeDetail.eightsem.messfee = messfee;
              newFeeDetail.eightsem.otherfee = otherfee;
            }

            //newFeeDetail.semester.coursefee=coursefee;
            newFeeDetail.save((err, newfeedetail)=>{

              if(err) {
                    return res.send({
                      success: false,
                      message: 'Error: Server error in saving new fee details'
                    });
              } else {

                    Student.findOneAndUpdate({
                      regNo: regNo
                    }, {
                      $set: { feedetail_id: newfeedetail.id}
                    }, null, (err)=>{
                      if(err) {
                        return res.send({
                          success: false,
                          message: 'Error: insert student details id matching failed'
                        });
                      }
                    });

                    return res.send({
                      success: true,
                      message: 'successfully saved fee details'
                    });
              }

            });
        }

      });

    });
  app.post('/api/account/insertstudentacademicresults', (req, res, next)=>{
    const { body } = req;
    const { regNo,
            currentsem,
            sec,
            subject,
            lab,
            chooseelective
             } = body;


            StudentAcademicDetail.find({
              regNo: regNo
            }, (err, prevUsers)=>{
              if(err){
                return res.send({
                  success: false,
                  message: 'Error: server error in inserting academics details'
                });
              }
              if(prevUsers.length != 0) {
                const user = prevUsers[0];
                const newDetail = new StudentAcademicDetail();
                user.sec=sec;
                user.currentsem=currentsem;
                user.subject = [];
                user.lab=[];
                user.chooseelective=[];
                user.isAutoAssigned = false;
                if(subject) {
                  subject.forEach((eachsubject)=>{
                    newDetail.subject.push({
                      subjectcode: eachsubject.subjectcode,
                      subjectname: eachsubject.subjectname
                    });
                  });
                }

                if(lab){
                  lab.forEach((eachlab)=>{
                        newDetail.lab.push({
                          labname: eachlab.subjectname,
                          labcode: eachlab.subjectcode
                        });
                  });
                }

                if(chooseelective) {
                  chooseelective.forEach(subject=>{
                        newDetail.chooseelective.push({
                          subjectname: subject.subjectname,
                          subjectcode: subject.subjectcode
                        });
                  });
                }

                user.subject = newDetail.subject;
                user.lab = newDetail.lab;
                user.chooseelective = newDetail.chooseelective;

                user.save((err)=>{
                  if(err) {
                    return res.send({
                      success: false,
                      message: "Server Error in saving data"
                    });
                  } else {
                    return res.send({
                      success: true,
                      message: "registration complete"
                    });
                  }
                });

              } else {
                const newDetail = new StudentAcademicDetail();
                newDetail.regNo = regNo;
                newDetail.currentsem = currentsem;
                newDetail.sec = sec;
                if(subject) {
                  subject.forEach((eachsubject)=>{
                         newDetail.subject.push({
                         subjectname: eachsubject.subjectname,
                         subjectcode: eachsubject.subjectcode
                      });
                  });
               }

                if(lab){
                  lab.forEach((eachlab)=>{
                        newDetail.lab.push({
                          labname: eachlab.labname,
                          labcode: eachlab.labcode
                        });
                  });
                }

                if(chooseelective){
                  chooseelective.forEach(subject=>{
                        newDetail.chooseelective.push({
                          subjectname: subject.subjectname,
                          subjectcode: subject.subjectcode
                        });
                  });
                }

                newDetail.save((err, user)=>{
                  if(err) {
                    return res.send({
                      success: false,
                      message: err
                    });
                  } else {

                    Student.findOneAndUpdate({
                      regNo: regNo
                    }, {
                      $set: { studentacademicdetail_id: user.id}
                    }, null, (err)=>{
                      if(err) {
                        return res.send({
                          success: false,
                          message: 'Error: insert academic details id matching failed'
                        });
                      }
                    });

                    return res.send({
                      success: true,
                      message: 'Server saved new details successfully'
                    });
                  }
                });
              }
            });

  });
}

/*
assignment1,
assignment2,
sessional1,
sessional2,
quiz1,
quiz2,
attendance,
finalsem
*/
