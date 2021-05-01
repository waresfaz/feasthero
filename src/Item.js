import Modal from "./Modal";
import useModal from "./useModal";
// props refers to the properties being passed into the Item component in List.js
export default function Item(props) {
  const { isShowing, toggle } = useModal(); // extracting isShowing and toggle from useModal.js

  // HTML structure for the Item component
  return (
    <main>
      <div className="item">
        <div className="item-image">
          <img className="thumbnail" src={props.thumbnail} alt="" />
        </div>

        <div className="item-details">
          <div className="item--header">
            <h2 className="item--title">{props.title}</h2>
            <p>${props.cost}/ device</p>
            <p>Class Duration: {props.duration} hours</p>
          </div>
          <p className="item--description">{props.description}</p>
        </div>

        <div className="item-button">
          <button className="select-item" onClick={toggle}>
            Book Now
          </button>
          <Modal
            class_id={props.class_id}
            isShowing={isShowing}
            hide={toggle}
            duration={props.duration}
            chef={props.chef}
            title={props.title}
            cost={props.cost}
          />
        </div>
      </div>
    </main>
  );
}
