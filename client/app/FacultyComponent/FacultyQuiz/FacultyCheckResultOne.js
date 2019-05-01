import React from 'react';
import { Progress } from 'semantic-ui-react'

class OneQuiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noofstudent: ''
    }
    this.generateResult = this.generateResult.bind(this);
  }

  generateResult() {
    let result = this.props.result.filter(result=>{return result.quiz_id == this.props.quiz._id});
    let totalresult = result.length;
    let correctresult = result.filter(result=>{return result.correct === true}).length;
    //console.log(totalresult);
    let totalnoofstudent = this.props.totalnoofstudent;
    let percent = (correctresult/totalnoofstudent) * 100;

    return (
      <>
      <h6>Total Students: {this.props.totalnoofstudent} Correct % : {percent}</h6>
      <Progress percent={percent} success>
        The progress was successful
      </Progress>
      </>
    );
  }

  render() {
    //console.log(this.props.quiz);
    //console.log(this.props.result);
    return (
      <div className="FacultyCheckResultOne-flex-frame">
        <div className="FacultyCheckResultOne-left-frame">
          <h5>{this.props.quiz.question}</h5>
        </div>
        <div className="FacultyCheckResultOne-right-frame">
          {
            this.generateResult()
          }
        </div>
      </div>
    );
  }
}

export class FacultyCheckResultOne extends React.Component {
  constructor(props) {
    super(props);
    this.generateQuestionList = this.generateQuestionList.bind(this);
  }

  generateQuestionList() {
    let item = [];
    console.log(this.props.quiz.noofstudents);
    this.props.quiz.quiz.map((quiz, index)=>{
      item.push(<OneQuiz key={index} totalnoofstudent={this.props.quiz.noofstudents} result={this.props.quiz.result} quiz={quiz}/>)
    });
    return item;
  }

  render() {
    console.log(this.props.quiz);
    return (
      <div className="FacultyCheckResultOne-main-frame">
        <div className="FacultyCheckResultOne-top-frame">
        <h6>Semester-{this.props.quiz.semester} &nbsp; Branch-{this.props.quiz.branch} &nbsp; Sec-{this.props.quiz.sec}</h6>
        </div>
        {
          this.generateQuestionList()
        }
      </div>
    );
  }
}
