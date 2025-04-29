const Footer = () => {
  const currentYear = new Date().getFullYear()
  // Hardcoded wallet address
  const orgWalletAddress = "0x524C9119a6C672a6A6A44606054CdeE20e9B144b"

  // Format the wallet address for display (first 6 and last 6 characters)
  const formatWalletAddress = (address) => {
    if (!address) return ""
    return `${address.substring(0, 6)}...${address.substring(address.length - 6)}`
  }

  return (
    <div className="footer">
      <div className="footer-top">
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
      </div>

      <div className="footer-copyright">
        <p>© {currentYear} She3Africa. All rights reserved.</p>
        <div className="footer-donation-address">
          <span>Donations:</span>
          <a
            href={`https://etherscan.io/address/${orgWalletAddress}`}
            target="_blank"
            rel="noreferrer"
            className="wallet-address"
          >
            {formatWalletAddress(orgWalletAddress)}
          </a>
          <span className="heart">❤️</span>
        </div>
      </div>
    </div>
  )
}

export default Footer
