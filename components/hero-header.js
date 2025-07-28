export default function HeroHeader() {
  return (
    <section className="landing">
      <h1 className="section-bg-heading">Web Developer</h1>
      <div className="logo">
        <span>Web</span>
        <span>Dev</span>
      </div>
      <div className="banner">
        <div className="section-border"></div>
        <div className="developer-info">
          <h3 className="greeting">Hello, <span>my name is</span></h3>
          <h1 className="name"><span>John</span> Smith</h1>
          <h3 className="prof">I am <span>Web Developer</span></h3>
          <p className="about">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
            at cum rerum dicta harum, quam esse modi placeat deserunt illum!
          </p>
          <div className="social-media">
            <i className="fa-brands fa-facebook-f"></i>
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-twitter"></i>
          </div>
          <div className="cv">
            <button type="button" className="btn cv-btn">Download cv</button>
            <span>My skills</span>
          </div>
        </div>
        <div className="developer-img">
          <div className="dev-img-wrapper">
            <img src="/images/developer.png" alt="John Smith - Web Developer" />
          </div>
          <div className="dev-experience dev-work">
            <span>15</span>
            <span>years of experience</span>
          </div>
          <div className="dev-projects dev-work">
            <span>400+</span>
            <span>completed projects</span>
          </div>
        </div>
      </div>
    </section>
  );
}