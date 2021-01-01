export default function Landing() {

  return (
    <body>
      <div className="landing">

      <section className="landing--logo">
        <img 
          className="logo"
          src="images/logo_transparent_background.png"
          alt=""
        />
      </section>

        <video className="landing--video" autoPlay loop muted>
          <source src="images/pexels_salt_hd.mp4" type="video/mp4" />
        </video>

      </div>
    </body>
  )
}