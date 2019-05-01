import React from 'react';
import './AdminAddStudent.css';
import { UploadStudentFile } from './UploadStudentFile';

export class AdminAddStudent extends React.Component {
  render() {
    return (
      <div className="AdminAddStudentinExcel-main-frame">
        <UploadStudentFile />
      </div>
    );
  }
}
