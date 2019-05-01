import React from 'react';
import { FacultyCheckResultOne } from './FacultyCheckResultOne';

export class FacultyCheckResults extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      quizDetail: []
    }
    this.generateCheckFrame = this.generateCheckFrame.bind(this);
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
          //console.log(this.state.quizDetail);
        });
      } else {
        window.alert('fetching quiz details failed');
      }
    });
  }

  generateCheckFrame() {
    if(this.state.quizDetail) {
      let item = [];
      this.state.quizDetail.map((quiz, index)=>{
        item.push(<li key={index}><FacultyCheckResultOne quiz={quiz}/></li>);
      });
      return item;
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="FacultyCheckResults-main-frame">
        {
          this.generateCheckFrame()
        }
      </div>
    );
  }
}
