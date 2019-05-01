import React from 'react';
import { FacultySetVisibleOneCard } from './FacultySetVisibleOneCard';
export class FacultySetVisibility extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      quizDetail: []
    }
  }

  componentDidMount() {
    fetch('/api/facultyaccount/getQuizDetails', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({

      })
    })
    .then(res=>res.json())
    .then(json=>{
      if(json.success) {
        this.setState({
          quizDetail: json.data
        }, ()=>{
          console.log(this.state.quizDetail);
        });
      } else {
        window.alert('fetching quiz details failed');
      }
    });
  }

  generateQuizList() {
    if(this.state.quizDetail) {
      let item = [];
      this.state.quizDetail.map((quiz, index)=>{
        item.push(<li key={index}><FacultySetVisibleOneCard quiz={quiz}/></li>);
      });
      return item;
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="FacultySetVisibility-main-frame">
        <div className="FacultySetVisibility-body-frame">
          {
            this.generateQuizList()
          }
        </div>
      </div>
    );
  }
}
