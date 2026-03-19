export default function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-inner">
        <h2 className="contact-heading">Contact Me</h2>
        <p className="contact-sub">
          Feel free to contact me directly through this form or reach out through{" "}
          <a href="https://www.linkedin.com/in/brianfu-/" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          .
        </p>

        <form className="contact-form">
          <div className="contact-row">
            <div className="contact-field">
              <label htmlFor="name">Full Name</label>
              <input id="name" name="name" type="text" placeholder="Kai Cenat" />
            </div>
            <div className="contact-field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" placeholder="kaicenat@uwaterloo.ca" />
            </div>
          </div>

          <div className="contact-field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Hi Brian, I just saw your portfolio site. I'd love to chat!"
            />
          </div>

          <div className="contact-submit-row">
            <button type="submit" className="contact-submit">
              Submit
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22 2 11 13M22 2 15 22l-4-9-9-4 20-7z" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
