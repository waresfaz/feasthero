export default function Landing() {
  return (
    <div className="navbar">
      <img
        className="logo"
        src="rebrand/FeastHeroLogo.png"
        alt=""
      />
      <div className="navbar--list">
        <a className="navbar--list--item">Classes</a>
        <a className="navbar--list--item">How It Works</a>
        <a className="navbar--list--item">Features</a>
        <a className="navbar--list--item">Contact Us</a>
      </div>
    </div>
  );
}