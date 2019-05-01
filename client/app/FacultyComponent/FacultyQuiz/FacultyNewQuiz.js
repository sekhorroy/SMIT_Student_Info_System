import React from 'react';
import { getFromStorage } from '../../Util/LocalStorage';
import { Form, TextArea, Input, Checkbox, Button } from 'semantic-ui-react'

export class FacultyNewQuiz extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      semester: '',
      branch: '',
      sec: '',
      question: '',
      correct: '',
      optionsarray: [],
      visible: false
    }

    this.onChangeBranch = this.onChangeBranch.bind(this);
    this.onChangeSemester = this.onChangeSemester.bind(this);
    this.onChangeSection = this.onChangeSection.bind(this);
    this.onChangenoofoptions = this.onChangenoofoptions.bind(this);
    this.onChangeQuestion = this.onChangeQuestion.bind(this);
    this.generateOptionValueFields = this.generateOptionValueFields.bind(this);
    this.handleOptionValue = this.handleOptionValue.bind(this);
    this.generateCorrectOption = this.generateCorrectOption.bind(this);
    this.setVisible = this.setVisible.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangecorrect = this.onChangecorrect.bind(this);
  }

  onChangeBranch(e) {
    this.setState({
      branch: e.target.value
    });
  }

  onChangeSection(e) {
    this.setState({
      sec: e.target.value
    });
  }

  onChangeSemester(e) {
    this.setState({
      semester: e.target.value
    });
  }

  onChangenoofoptions(e) {
    this.setState({
      noofoptions: e.target.value
    }, ()=>{
      let i = 0;
      let newoptionarray = [];
      while(i<this.state.noofoptions) {
        let option = {
          id: i+1,
          value: ''
        }
        newoptionarray.push(option);
        i++;
      }

      this.setState({
        optionsarray: newoptionarray
      });
    });
  }

  onChangeQuestion(e) {
    this.setState({
      question: e.target.value
    });
  }

  onChangecorrect (e) {
    this.setState({
      correct: e.target.value
    });
  }

  handleOptionValue(e) {
    let item = {
      id: e.target.id,
      value: e.target.value
    }

    let optionarray = this.state.optionsarray;
    let newoptionarray = [];

    optionarray.forEach((option)=>{
      if(option.id == item.id) {
        option.value=item.value;
      }
      newoptionarray.push(option);
    });

    this.setState({
      optionsarray: newoptionarray
    }, ()=>{
      console.log(this.state.optionsarray);
    });
  }

  generateOptionValueFields() {
    if(this.state.noofoptions) {
      let i = 0;
      let item = [];
      while(i<this.state.noofoptions) {
        item.push(<div><Input label={i+1} id={i+1} placeholder='Option Value' onChange={this.handleOptionValue}/></div>);
        i++;
      }
      return item;
    } else {
      return null;
    }
  }

  generateCorrectOption() {
    if(this.state.noofoptions) {
      let item = [];
      let i = 1;
      while(i<=this.state.noofoptions) {
        item.push(<option value={i}>{i}</option>);
        i++;
      }
      return item;
    } else {
      return null;
    }
  }

  setVisible() {
    this.setState({
      visible: !this.state.visible
    }, ()=>{
      console.log(this.state.visible);
    });
  }

  onSubmit() {
    if(this.state.optionsarray && this.state.noofoptions) {
      fetch('/api/facultyaccount/generateQuestion', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          semester: this.state.semester,
          branch: this.state.branch,
          sec: this.state.sec,
          question: this.state.question,
          option: this.state.optionsarray,
          correct: this.state.correct,
          isVisible: this.state.visible
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
    } else {
      window.alert('Please fill the relevant details')
    }
  }

  render() {
    return (
      <div className="FacultyNewQuiz-main-frame">
        <div className="FacultyNewQuiz-header-frame">
          <h3>Add New Quiz</h3>
        </div>
        <div className="New-Question-frame">
        <label>Select Semester</label>
        <select  className="browser-default custom-select" onChange={this.onChangeSemester}>
          <option value="">Select Semester</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
        </select>
        <br/>
        <label>Select Branch &nbsp;&nbsp;&nbsp;</label>
        <select  className="browser-default custom-select" onChange={this.onChangeBranch}>
          <option value="">Select Branch</option>
          <option value="CSE">CSE</option>
          <option value="MECH">MECH</option>
          <option value="EEE">EEE</option>
          <option value="CE">CE</option>
          <option value="ECE">ECE</option>
          <option value="IT">IT</option>
        </select>
        <br/>
        <label>Select Section &nbsp;&nbsp;</label>
        <select  className="browser-default custom-select" onChange={this.onChangeSection}>
          <option value="">Select Section</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="E">E</option>
          <option value="F">F</option>
          <option value="G">G</option>
          <option value="H">I</option>
        </select>
        <br/>
        <label>Question</label>
        <Form>
          <TextArea placeholder='Ask A Question?' onChange={this.onChangeQuestion}/>
        </Form>
        <br/>
        <label>No. of Options</label>
        <select  className="browser-default custom-select" onChange={this.onChangenoofoptions}>
          <option value="">No of options</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
        </select>
        <Form>
        {
          this.generateOptionValueFields()
        }
        </Form>
        <label>Correct Option </label>
        <select  className="browser-default custom-select" onChange={this.onChangecorrect}>
          <option value=""></option>
          {
            this.generateCorrectOption()
          }
        </select>
        <br/>
        <label>Set Visible &nbsp;</label>
        <Checkbox toggle onChange={this.setVisible}/>
        <div className="New-Quiz-Frame-btn" >
          <Button primary onClick={this.onSubmit}>Add Question</Button>
        </div>
        </div>
      </div>
    );
  }
}
