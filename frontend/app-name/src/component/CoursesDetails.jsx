import React from 'react'

const CoursesDetails = () => {
  return (
     <div className="course-card">
      <img  alt="" className="course-img" />
      <div className="course-content">
        <h4 className="course-title"></h4>

        <div className="course-meta">
          <span> Lessons</span>
          <span>  Students</span>
        </div>
        <div className="course-rating">
           <small>( Reviews)</small>
        </div>
        <div className="course-footer">
          <div className="instructor">
            <img  alt="" />
            <span>hh</span>
          </div>
          <span className="price">$</span>
        </div>
      </div>
    </div>
  )
}

export default CoursesDetails