import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { AdvancedControl, AddLabCourses, AddCourses, AddElectiveCourses } from './AddCourses/AddCourses';
import './UpdateCourse.css';
import { ViewCourseBySemester } from './ViewCourseBySemester/ViewCourseBySemester';

export class UpdateCourse extends Component {
  render(){
    return (
      <div className="update-course-main-frame">
      <Tabs defaultActiveKey="ViewAllCourses" id="uncontrolled-tab-example">

        <Tab eventKey="ViewAllCourses" title=<i className="fas fa-arrow-alt-circle-down"> View All Courses</i>>
        <div className="viewcourse-main-frame">
          <Tabs defaultActiveKey="semester1" id="uncontrolled-select coursetype">
            <Tab eventKey="semester1" title=<i class="fas fa-chevron-down"> Semester 1</i>>
              <ViewCourseBySemester semester="1"/>
            </Tab>
            <Tab eventKey="semester2" title=<i class="fas fa-chevron-down"> Semester 2</i>>
              <ViewCourseBySemester semester="2"/>
            </Tab>
            <Tab eventKey="semester3" title=<i class="fas fa-chevron-down"> Semester 3</i>>
              <ViewCourseBySemester semester="3"/>
            </Tab>
            <Tab eventKey="semester4" title=<i class="fas fa-chevron-down"> Semester 4</i>>
              <ViewCourseBySemester semester="4"/>
            </Tab>
            <Tab eventKey="semester5" title=<i class="fas fa-chevron-down"> Semester 5</i>>
              <ViewCourseBySemester semester="5"/>
            </Tab>
            <Tab eventKey="semester6" title=<i class="fas fa-chevron-down"> Semester 6</i>>
              <ViewCourseBySemester semester="6"/>
            </Tab>
            <Tab eventKey="semester7" title=<i class="fas fa-chevron-down"> Semester 7</i>>
              <ViewCourseBySemester semester="7"/>
            </Tab>
            <Tab eventKey="semester8" title=<i class="fas fa-chevron-down"> Semester 8</i>>
              <ViewCourseBySemester semester="8"/>
            </Tab>
          </Tabs>
        </div>
        </Tab>
        <Tab eventKey="Add" title=<i class="fas fa-cog"> Advanced Option</i>>
          <div className="addcourse-main-frame">
            <Tabs defaultActiveKey="CompulsoryCourse" id="uncontrolled-select coursetype">
              <Tab eventKey="CompulsoryCourse" title="Add Regular Subject">
                <AddCourses />
              </Tab>
              <Tab eventKey="Elective Courses" title="Add Elective Subject">
                <AddElectiveCourses />
              </Tab>
              <Tab eventKey="LabCourses" title="Add Labs">
                <AddLabCourses />
              </Tab>
              <Tab eventKey="Advanced" title="Advanced">
                <AdvancedControl/>
              </Tab>
            </Tabs>
          </div>
        </Tab>
      </Tabs>
      </div>
    );
  }
};
