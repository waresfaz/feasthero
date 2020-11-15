

export default function item() {
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
            <p className="title">Qabuli Palaw Palooza</p>
            <p>$45/ person</p>
          </div>
          <p className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non laoreet ipsum, id rutrum dui. Donec pretium lacus libero, at pretium justo consectetur ornare. Integer at dolor nibh.</p>
        </div>

        <div className="item-button">
          <button className="select-item">Select</button>
        </div>

      </div>

    </main>
  );
}