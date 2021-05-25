import Modal from "./Modal";
import useModal from "./useModal";
// props refers to the properties being passed into the Item component in List.js
export default function Item(props) {
  const { isShowing, toggle } = useModal(); // extracting isShowing and toggle from useModal.js

  // HTML structure for the Item component
  return (
<div className="col-xl-6 col-lg-6 col-md-6 col-12">

<div className="classDetails-contentitem mb-30">
  <a href="#" className="classdetaisl-itemmodel"><img src={props.thumbnail} alt="" width="100%" /></a>

  <div className="chefsclass-contentbox">

    <div className="clasdetailsbox d-flex align-items-center justify-content-between">

      <div className="chefs-avatrdetails d-flex align-items-center">
        <a href="#" className="chefs-img"><img src="img/ChefImage.png" alt="" />
        </a>
        <div className="chefs-claseshover-overflow d-flex"><a href="#" className="chefs-img">
        </a><a href="#" className="avatar-hoveroverly"><img src="img/hover-img1.png" alt="" /></a>

          <div className="hover-overlyntextChefs">

            <h3>{props.chef.name}</h3>

            <p>{props.chef.bio}
    </p>
          </div>
        </div>


        <div className="chefs-svadetiltext">

          <h5 className="chefs-clasname">{props.title}</h5>

          <h6 className="chefs-clasdetaisltext"><span>{props.duration} Hrs | ${props.cost}</span> per device</h6>
        </div>
      </div>
      <a href="bookingPage-1.html" className="booking-btn chefs-btn">Book Now <span><img src="img/Vector2.png" alt="" /></span></a>
    </div>
  </div>
</div>
</div>


    //===================================================
    // <main>
    //   <div className="item">
    //     <div className="item-image">
    //       <img className="thumbnail" src={props.thumbnail} alt="" />
    //     </div>

    //     <div className="item-details">
    //       <div className="item--header">
    //         <h2 className="item--title">{props.title}</h2>
    //         <p>${props.cost}/ device</p>
    //         <p>Class Duration: {props.duration} hours</p>
    //       </div>
    //       <p className="item--description">{props.description}</p>
    //     </div>

    //     <div className="item-button">
    //       <button className="select-item" onClick={toggle}>
    //         Book Now
    //       </button>
    //       <Modal
    //         class_id={props.class_id}
    //         isShowing={isShowing}
    //         hide={toggle}
    //         duration={props.duration}
    //         chef={props.chef}
    //         title={props.title}
    //         cost={props.cost}
    //       />
    //     </div>
    //   </div>
    // </main>
  );
}
