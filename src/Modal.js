import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';
import BookingForm from "./BookingForm"

import scheduleHelper from './helpers/ScheduleHelper'
import handleSubmit from './helpers/HandleSubmit'
import handleChange from './helpers/HandleSubmit';
import formReducer from './helpers/HandleSubmit';
import { useReducer } from 'react';

//object destrcutring used here to access props that passed in on Item.js
const Modal = ({ isShowing, hide, chef, schedule }) => isShowing ? ReactDOM.createPortal(
  <React.Fragment>
    <div className="modal-overlay" />
    <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
      <div className="modal">
        <div className="modal-header">
          <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-content">
          <img className="chefPhoto" src={chef.photo} alt="" />
          <p>Chef: {chef.name} </p>
          <p>{chef.bio} </p>
          <BookingForm 
            schedule={schedule}
          />
          
        </div>
      </div>
    </div>
  </React.Fragment>, document.body
) : null;

export default Modal;