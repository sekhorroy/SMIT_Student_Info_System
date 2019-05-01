import React from 'react';
import { Form, Checkbox, Button } from 'semantic-ui-react'

export class StudentOneQuiz extends React.Component {

  state = {}

  handleChange = (e, { value }) => this.setState({ value }, ()=>{
    console.log(this.state.value);
  });


  generateOption = () => {
    if(this.props.quiz) {
      let optionField = [];
      this.props.quiz.option.forEach((option, index)=>{
        optionField.push(
            <Form.Field key={index}>
              <Checkbox
                radio
                label={option.value}
                name='checkboxRadioGroup'
                value={option.id}
                checked={this.state.value === option.id}
                onChange={this.handleChange}
              />
            </Form.Field>
          );
      });
      return optionField;
    } else {
      return null;
    }
  }

  onSubmit = () => {
    const { _id } = this.props.quiz;
    const { regNo } = this.props.studentObj;
    const { branch } = this.props.studentObj;
    const { currentsem } = this.props.studentObj;
    const { value } = this.state;
    console.log( _id );
    if(!this.state.value) {
      window.alert('Select A Option to Submit');
    } else {
      fetch('/api/facultyaccount/submitQuiz', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          quiz_id: _id,
          regNo: regNo,
          branch: branch,
          sec: 'A',
          semester: currentsem,
          value: value
        })
      })
      .then(res=>res.json())
      .then(json=>{
        if(json.success) {
          window.alert(json.message);
        } else {
          window.alert(json.message);
        }
      });
    }
  }

  render() {
    console.log(this.props.quiz);
    return (
      <div className="StudentOneQuiz-main-frame">
        <Form>
         <Form.Field>
           <b>{this.props.quiz.question}</b>
         </Form.Field>
         {
           this.generateOption()
         }
         </Form>
         <br/>
         <Button primary onClick={this.onSubmit}>Submit</Button>
      </div>
    );
  }
}
