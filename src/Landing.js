export default function Landing() {
  return (
    <div className="landing">
      <section className="landing--front">
        <img
          className="logo"
          src="images/logo_transparent_background.png"
          alt=""
        />

        <div className="landing--front--byline">
          <p>Cook together from anywhere</p>
        </div>
      </section>

      <div className="landing--video">
        <div className="landing--color-overlay"></div>
        <video autoPlay loop muted id="video">
          <source src="images/pexels_stir.mp4" type="video/mp4" />
        </video>
      </div>

      <img id="scrolldown" src="images/scroll.gif" alt="" />
    </div>
  );
}
