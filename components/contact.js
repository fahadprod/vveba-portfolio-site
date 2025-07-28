export default function Contact() {
  return (
    <section className="contact">
      <h1 className="section-bg-heading">Contact Me</h1>
      <h1 className="section-heading">Contact</h1>
      <h3 className="sub-heading">Let&apos;s <span>Have Some Talk</span></h3>
      <div className="section-border"></div>
      <div className="contact-content">
        <div className="contact-left">
          <div className="address">
            <i className="fa-solid fa-location-dot"></i>
            <div className="contact-info">
              <span>Address</span>
              <span>New York, USA</span>
            </div>
          </div>
          <div className="freelance">
            <i className="fa-regular fa-user"></i>
            <div className="contact-info">
              <span>Freelance</span>
              <span>Available Right Now</span>
            </div>
          </div>
          <div className="email">
            <i className="fa-regular fa-envelope"></i>
            <div className="contact-info">
              <span>Email</span>
              <span>johnsmith@webdev.com</span>
            </div>
          </div>
          <div className="phone">
            <i className="fa-solid fa-phone"></i>
            <div className="contact-info">
              <span>Phone</span>
              <span>+123 456 7890</span>
            </div>
          </div>
        </div>
        <div className="contact-right">
          <form>
            <div className="input-groups">
              <div className="input-group">
                <label htmlFor="name">
                  Your full name <i className="fa-solid fa-asterisk"></i>
                </label>
                <input type="text" id="name" />
              </div>
              <div className="input-group">
                <label htmlFor="email">
                  Your email address <i className="fa-solid fa-asterisk"></i>
                </label>
                <input type="email" id="email" />
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="subject">
                Your subject <i className="fa-solid fa-asterisk"></i>
              </label>
              <input type="text" id="subject" />
            </div>
            <div className="input-group">
              <label htmlFor="message">
                Your message <i className="fa-solid fa-asterisk"></i>
              </label>
              <textarea id="message"></textarea>
            </div>
            <button type="button" className="contact-btn">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
}