// // import PropTypes from 'prop-types';

// export default function modal(props) {

//   console.log(props.show)

//   // Render nothing if the "show" prop is false
//   if(props.show === false) {
//     return null;
//   }

//   // The gray background
//   const backdropStyle = {
//     position: 'fixed',
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: 'rgba(0,0,0,0.3)',
//     padding: 50
//   };

//   // The modal "window"
//   const modalStyle = {
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     maxWidth: 500,
//     minHeight: 300,
//     margin: '0 auto',
//     padding: 30
//   };

//   return (
//     <div className="backdrop" style={{backdropStyle}}>
//       <div className="modal" style={{modalStyle}}>
//         This is showing now so it's set to true

//         <div className="footer">
//           <button onClick={props.onClose}>
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Modal.propTypes = {
// //   onClose: PropTypes.func.isRequired,
// //   show: PropTypes.bool,
// //   children: PropTypes.node
// // };



import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const Modal = ({ isShowing, hide }) => isShowing ? ReactDOM.createPortal(
  <React.Fragment>
    <div className="modal-overlay"/>
    <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
      <div className="modal">
        <div className="modal-header">
          <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <p>
          Hello, I'm a modal.
        </p>
      </div>
    </div>
  </React.Fragment>, document.body
) : null;

export default Modal;