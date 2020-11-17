

export default function item(props) {
  return (
    <main>

      <div className="item">

        <div className="item-image">
          <img 
            className="thumbnail"
            src="images/qabuli.png"
            alt=""
          />
          {/* <div className="chef-info">
            <img 
              className="chef-thumbnail"
              src="images/chef.png"
              alt=""
            />
            <p className="chef-name">Chef George</p>
          </div> */}
        </div>

        <div className="item-details">
          <div className="item-header">
            <p className="title">{props.title}</p>
            <p>${props.price}/ person</p>
          </div>
          <p className="description">{props.description}</p>
        </div>

        <div className="item-button">
          <button className="select-item">Select</button>
        </div>

      </div>

    </main>
  );
}