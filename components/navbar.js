export default function Navbar() {
  return (
    <>
      <div className="menu-icon">
        <div className="line line-1"></div>
        <div className="line line-2"></div>
      </div>
      <nav className="navigation">
        <div className="section-border"></div>
        <div className="nav-items">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Projects</a>
          <a href="#">Gallery</a>
          <a href="#">Blog</a>
          <a href="#">Clients</a>
          <a href="#">Pricing</a>
          <a href="#">Contact</a>
        </div>
      </nav>
    </>
  );
}