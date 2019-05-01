import React from 'react';
import './StudentQuiz.css';
import { getFromStorage } from '../../Util/LocalStorage';
import { Form } from 'semantic-ui-react';
import { StudentOneQuiz } from './StudentOneQuiz';

export class StudentQuiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quizData: ''
    }

    this.generateQuizFrame = this.generateQuizFrame.bind(this);
  }

  componentDidMount() {
    const academicObj = getFromStorage('student_academic_details').academicObj;
    console.log(academicObj);
    if(this.props.studentObj) {
      const { branch, currentsem, course } = this.props.studentObj;
      const { sec } = academicObj;
      console.log(branch, currentsem, sec);

      fetch('/api/account/getquizdetails', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          branch: branch,
          semester: currentsem,
          sec: sec
        })
      })
      .then(res=>res.json())
      .then(json=>{
        if(json.success) {
          this.setState({
            quizData: json.data
          }, ()=>{
            //console.log(this.state.quizData);
          });
        } else {
          window.alert('Quiz Detail Failed to Fetch');
        }
      });
    }
  }

  generateQuizFrame() {
    if(this.state.quizData && this.state.quizData.isVisible) {
      let quizlist = [];
      this.state.quizData.quiz.map((quiz, index)=>{
        quizlist.push(<li key={index}><StudentOneQuiz studentObj={this.props.studentObj} quiz={quiz}/></li>);
      });
      return quizlist;
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="StudentQuiz-main-frame">
        <div className="Question-main-frame">
          {
            this.generateQuizFrame()
          }
        </div>
      </div>
    );
  }
}
