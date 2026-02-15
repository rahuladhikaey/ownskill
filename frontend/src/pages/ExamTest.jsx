import React from 'react';
import { Link } from 'react-router-dom';

export default function ExamTest() {
  return (
    <div className="container-main">
      <div className="exam-timer">⏱️ Time Remaining: Loading...</div>
      <h1 className="page-title">📝 Taking Exam</h1>
      <p>Loading exam questions...</p>
    </div>
  );
}
