const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <div className="footer">
      <div className="footer-logo">
        <h3>She3Africa</h3>
        <p>Empowering African women in Web3</p>
      </div>

      <div className="footer-links">
        <div className="footer-section">
          <h4>Quick Links</h4>
          <a href="/">Home</a>
          <a href="/activities">Activities</a>
          <a href="/donate">Donate</a>
        </div>

        <div className="footer-section">
          <h4>Connect</h4>
          <a href="https://x.com/sheweb3" target="_blank" rel="noreferrer">
            Twitter
          </a>
          <a href="#" target="_blank" rel="noreferrer">
            Discord
          </a>
          <a href="#" target="_blank" rel="noreferrer">
            Telegram
          </a>
        </div>
      </div>

      <div className="footer-copyright">
        <p>© {currentYear} She3Africa. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer
