// the header portion of the page
export default function header() {
  return (
    <header className="header">

      <section className="header--logo">
        <img 
          className="logo"
          src="images/white_logo_color_background.png"
          alt=""
        />
      </section>

      <section className="header--links">
        <button className="aboutus" type="button">About Us</button>

      </section>
    </header>
  );
}