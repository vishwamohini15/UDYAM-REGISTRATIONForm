import React from 'react';
import './UdyamFooter.css';

const UdyamFooter = () => {
  return (
    <footer className="footer-section">
      <div className="footer-container">

        {/* Main Info Column */}
        <div className="footer-column">
          <h4>Udyam Registration</h4>
          <h5>Ministry of MSME</h5>
          <h5>Udyog Bhawan - New Delhi</h5>
          <h4>
            Email: <a href="mailto:champions@gov.in">champions@gov.in</a>
          </h4>

           <h4>Contact Us</h4>
          <ul>
            <li><a href="#">For Grievances / Problems</a></li>
          </ul>
        </div>


        {/* Our Services Column */}
        <div className="footer-column">
          <h4>Our Services</h4>
          <ul>
            <li><a href="#">▶ CHAMPIONS</a></li>
            <li><a href="#">▶ MSME Samadhaan</a></li>
            <li><a href="#">▶ MSME Sambandh</a></li>
            <li><a href="#">▶ MSME Dashboard</a></li>
            <li><a href="#">▶ Entrepreneurship Skill Development Programme (ESDP)</a></li>
            <li><a href="#">▶ Video</a></li>
          </ul>
        </div>

        {/* Video Column */}
        <div className="footer-column videofooter">
          <h4>Video</h4>
          <video 
            src="/udyam.mp4" 
            controls 
            poster='/videoPoster.png'
          />
        </div>

      </div>

      {/* Copyright */}
      <div className="footer-copyright">
        <p>
          © Copyright Udyam Registration. All Rights Reserved, Website Content Managed by Ministry of Micro Small and Medium Enterprises, GoI
        </p>
        <p>
          Website hosted & managed by <a href="#">National Informatics Centre</a>, 
          <a href="#"> Ministry of Communications and IT</a>, 
          <a href="#"> Government of India</a>
        </p>
      </div>
    </footer>
  );
};

export default UdyamFooter;
