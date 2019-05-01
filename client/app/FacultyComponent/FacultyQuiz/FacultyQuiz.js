import React from 'react';
import './FacultyQuiz.css';
import { SidebarSidebar } from './SideNavBar';
import { Button } from 'semantic-ui-react'
import { FacultyNewQuiz } from './FacultyNewQuiz';
import { FacultySetVisibility } from './FacultySetVisibility';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { FacultyCheckResults } from './FacultyCheckResults';

export class FacultyQuiz extends React.Component {
  render() {
    return (
      <div className="FacultyQuiz-main-frame">
        <div className="FacultyQuiz-header-frame">
          <div className="FacultyQuiz-section-name">
            <h3>Quiz Section</h3>
          </div>
          <div className="FacultyQuiz-more-button">
            <Button.Group>
              <Button positive><Nav.Link href="/faculty/quiz"><span className="quiz-btn"><i className="fas fa-plus"></i> New Question</span></Nav.Link></Button>
              <Button.Or />
              <Button positive><Nav.Link href="/faculty/quiz/checkresults"><span className="quiz-btn"><i className="fas fa-user-check"></i> Check Results</span></Nav.Link></Button>
              <Button.Or />
              <Button positive><Nav.Link href="/faculty/quiz/setvisibility"><span className="quiz-btn"><i className="fas fa-eye"></i> Set Visibility</span></Nav.Link></Button>
            </Button.Group>
          </div>
        </div>
        <div className="FacultyQuiz-body-frame">
          <Route exact path="/faculty/quiz" component={FacultyNewQuiz} />
          <Route path="/faculty/quiz/setvisibility" component={ FacultySetVisibility} />
          <Route path="/faculty/quiz/checkresults" component = { FacultyCheckResults } />
        </div>
      </div>
    );
  }

}
