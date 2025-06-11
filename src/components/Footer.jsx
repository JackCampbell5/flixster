import React from "react";
import ReactDOM from "react-dom";
import './Footer.css'
import PropTypes from 'prop-types';



function Footer({data}) {
  return (
    // JSX code for rendering the component
    <div className="Footer">
      <p className="authorName">Jack Campbell 2025 © <a href="mailto:jackbcampbell15@gmail.com">jackbcampbell15@gmail.com</a>      </p>
    </div>
  );
}

Footer.propTypes = {
    // data: PropTypes.array.isRequired,
};


export default Footer;
