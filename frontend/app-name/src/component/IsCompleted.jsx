import React from "react";
import "./IsCompleted.css";

function IsCompleted({ studentName, grade, courseName }) {
  return (
    <div className="certificate-page">
      <div className="certificate-scale">
        <div className="certificate-canvas">
          <img src="/images/p2.png" alt="Certificate" />

          <div className="cert-title">Certificate of appreciation</div>
          <div className="cert-subtitle">مقدمة من منصة التعليم الإلكتروني</div>
          <div className="cert-name">{studentName}</div>
          <div className="cert-desc">وذلك لإجتيازه دورة</div>
          <div className="cert-course">{courseName}</div>
          <div className="cert-grade">{grade}</div>
        </div>
      </div>
    </div>
  );
}

export default IsCompleted;
