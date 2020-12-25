import Modal from "./Modal";
import useModal from './useModal';
// props refers to the properties being passed into the Item component in List.js
export default function Item(props) {

  const {isShowing, toggle} = useModal(); // extracting isShowing and toggle from useModal.js

  // HTML structure for the Item component
  return (
    <main>

      <div className="item">

        <div className="item-image">
          <img 
            className="thumbnail"
            src="images/qabuli.png"
            alt=""
          />
        </div>

        <div className="item-details">
          <div className="item-header">
            <p className="title">{props.title}</p>
            <p>${props.cost}/ person</p>
            <p>Duration: {props.duration} hours</p> 
          </div>
          <p className="description">{props.description}</p>
        </div>

        <div className="item-button">
          <button className="select-item" onClick={toggle}>
            Select
          </button>
          <Modal 
            isShowing={isShowing}
            hide={toggle}
            duration = {props.duration}
            chef = {props.chef}
          />
        </div>

      </div>

    </main>
  );
}