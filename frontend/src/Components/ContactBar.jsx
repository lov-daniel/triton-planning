import React from 'react';
import './ComponentStyles/ContactBar.css';
import { useState } from 'react';

const ContactBar = () => {
  return (
    <div className="ContactBar">
        <div className="ContactInfo">
          <p>About Us </p>
          <p> Contact</p>
        </div>
    </div>
  );
};

export default ContactBar;