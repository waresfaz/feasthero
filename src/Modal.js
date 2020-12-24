import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

//object destrcutring used here to access props
const Modal = ({ isShowing, hide, chef }) => isShowing ? ReactDOM.createPortal(
  <React.Fragment>
    <div className="modal-overlay"/>
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
          <form>
            <p>How many people are you booking for?
              <input type="number" className="booking-size" min="8" max="20" placeholder="Limit 8-20" />
              <input type="button" className="submit-form" value="Submit" />
            </p>
          </form>
        </div>
      </div>
    </div>
  </React.Fragment>, document.body
) : null;

export default Modal;