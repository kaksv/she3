import { useState, useEffect } from "react"
import ContentHeader from "../components/ContentHeader"
import "../styles/donate.css"

// Organization wallet configuration
const ORGANIZATION_WALLET = {
  address: import.meta.env.VITE_ORGANIZATION_WALLET_ADDRESS || "0x524C9119a6C672a6A6A44606054CdeE20e9B144b",
  privateKey: import.meta.env.VITE_ORGANIZATION_WALLET_PRIVATE_KEY || "",
  isConfigured: Boolean(import.meta.env.VITE_ORGANIZATION_WALLET_ADDRESS),
}

const cryptoOptions = [
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    address: ORGANIZATION_WALLET.address,
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=025",
    chainId: "0x1", // Ethereum Mainnet
  },
  {
    id: "optimism",
    name: "Optimism",
    symbol: "OP",
    address: ORGANIZATION_WALLET.address,
    logo: "https://cryptologos.cc/logos/optimism-op-logo.svg?v=025",
    type: "ERC-20",
    chainId: "0xA", // Optimism
  },
  {
    id: "base",
    name: "Base",
    symbol: "ETH on Base",
    address: ORGANIZATION_WALLET.address,
    logo: "https://cryptologos.cc/logos/base-logo.svg?v=025",
    chainId: "0x2105", // Base
  },
  {
    id: "celo",
    name: "Celo",
    symbol: "CELO",
    address: ORGANIZATION_WALLET.address,
    logo: "https://cryptologos.cc/logos/celo-celo-logo.svg?v=025",
    chainId: "0xA4EC", // Celo
  },
  {
    id: "lisk",
    name: "Lisk",
    symbol: "LSK",
    address: ORGANIZATION_WALLET.address,
    logo: "https://cryptologos.cc/logos/lisk-lsk-logo.svg?v=025",
  },
  {
    id: "usdc",
    name: "USD Coin",
    symbol: "USDC",
    address: ORGANIZATION_WALLET.address,
    logo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=025",
    type: "ERC-20",
    chainId: "0x1", // Ethereum Mainnet
  },
  {
    id: "polygon",
    name: "Polygon",
    symbol: "MATIC",
    address: ORGANIZATION_WALLET.address,
    logo: "https://cryptologos.cc/logos/polygon-matic-logo.svg?v=025",
    chainId: "0x89", // Polygon
  },
]

const Donate = () => {
  const [selectedCrypto, setSelectedCrypto] = useState(null)
  const [showAllOptions, setShowAllOptions] = useState(false)
  const [copied, setCopied] = useState(false)
  const [donationStep, setDonationStep] = useState("select") // select, amount, confirm
  const [amount, setAmount] = useState("")
  const [donationPurpose, setDonationPurpose] = useState("general")

  // Wallet connection states
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [walletBalance, setWalletBalance] = useState(null)
  const [walletChainId, setWalletChainId] = useState(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionError, setConnectionError] = useState(null)
  const [transactionHash, setTransactionHash] = useState(null)
  const [transactionStatus, setTransactionStatus] = useState(null)
  const [adminMode, setAdminMode] = useState(false)

  const displayedOptions = showAllOptions ? cryptoOptions : cryptoOptions.slice(0, 5)

  // Check if MetaMask is installed
  const checkIfWalletIsInstalled = () => {
    if (typeof window !== "undefined") {
      return Boolean(window.ethereum)
    }
    return false
  }

  const isWalletInstalled = checkIfWalletIsInstalled()

  // Check if admin wallet is connected
  const checkIfAdminWallet = (address) => {
    if (!address || !ORGANIZATION_WALLET.address) return false
    return address.toLowerCase() === ORGANIZATION_WALLET.address.toLowerCase()
  }

  // Handle wallet connection
  const connectWallet = async () => {
    if (!isWalletInstalled) {
      setConnectionError("No Ethereum wallet detected. Please install MetaMask or another wallet.")
      return
    }

    setIsConnecting(true)
    setConnectionError(null)

    try {
      // Request account access
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })

      if (accounts.length > 0) {
        const connectedAddress = accounts[0]
        setWalletAddress(connectedAddress)
        setWalletConnected(true)

        // Check if this is the admin wallet
        const isAdmin = checkIfAdminWallet(connectedAddress)
        setAdminMode(isAdmin)

        if (isAdmin) {
          console.log("Admin wallet connected")
        }

        // Get chain ID
        const chainId = await window.ethereum.request({ method: "eth_chainId" })
        setWalletChainId(chainId)

        // Get balance
        const balance = await window.ethereum.request({
          method: "eth_getBalance",
          params: [connectedAddress, "latest"],
        })

        // Convert balance from wei to ETH
        const ethBalance = Number.parseInt(balance, 16) / 1e18
        setWalletBalance(ethBalance.toFixed(4))
      }
    } catch (error) {
      console.error("Error connecting wallet:", error)
      setConnectionError(error.message || "Failed to connect wallet")
    } finally {
      setIsConnecting(false)
    }
  }

  // Disconnect wallet
  const disconnectWallet = () => {
    setWalletConnected(false)
    setWalletAddress("")
    setWalletBalance(null)
    setWalletChainId(null)
    setAdminMode(false)
  }

  // Switch network if needed
  const switchNetwork = async (targetChainId) => {
    if (!walletConnected || !targetChainId) return

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: targetChainId }],
      })

      // Update chain ID after switching
      const newChainId = await window.ethereum.request({ method: "eth_chainId" })
      setWalletChainId(newChainId)

      return true
    } catch (error) {
      console.error("Error switching network:", error)
      setConnectionError(`Failed to switch network: ${error.message}`)
      return false
    }
  }

  // Send transaction
  const sendTransaction = async () => {
    if (!walletConnected || !selectedCrypto) {
      setConnectionError("Please connect your wallet first")
      return
    }

    setTransactionStatus("preparing")
    setConnectionError(null)

    try {
      // Check if we need to switch networks
      if (selectedCrypto.chainId && walletChainId !== selectedCrypto.chainId) {
        const switched = await switchNetwork(selectedCrypto.chainId)
        if (!switched) {
          setTransactionStatus(null)
          return
        }
      }

      // Convert amount to wei (for ETH-based chains)
      const amountInWei = `0x${(Number.parseFloat(amount) * 1e18).toString(16)}`

      // Prepare transaction
      const transactionParameters = {
        to: selectedCrypto.address,
        from: walletAddress,
        value: amountInWei,
        // For tokens, you would need to use a contract call instead
      }

      setTransactionStatus("pending")

      // Send transaction
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      })

      setTransactionHash(txHash)
      setTransactionStatus("submitted")

      // You could add transaction monitoring here
    } catch (error) {
      console.error("Transaction error:", error)
      setConnectionError(error.message || "Transaction failed")
      setTransactionStatus("failed")
    }
  }

  // Listen for account changes
  useEffect(() => {
    if (isWalletInstalled) {
      const handleAccountsChanged = (accounts) => {
        if (accounts.length === 0) {
          // User disconnected their wallet
          disconnectWallet()
        } else {
          // Account changed
          const newAddress = accounts[0]
          setWalletAddress(newAddress)

          // Check if this is the admin wallet
          const isAdmin = checkIfAdminWallet(newAddress)
          setAdminMode(isAdmin)
        }
      }

      const handleChainChanged = (chainId) => {
        // Chain changed, reload the page
        setWalletChainId(chainId)
      }

      window.ethereum.on("accountsChanged", handleAccountsChanged)
      window.ethereum.on("chainChanged", handleChainChanged)

      // Check if already connected
      window.ethereum.request({ method: "eth_accounts" }).then((accounts) => {
        if (accounts.length > 0) {
          const connectedAddress = accounts[0]
          setWalletAddress(connectedAddress)
          setWalletConnected(true)

          // Check if this is the admin wallet
          const isAdmin = checkIfAdminWallet(connectedAddress)
          setAdminMode(isAdmin)

          // Get chain ID
          window.ethereum.request({ method: "eth_chainId" }).then((chainId) => setWalletChainId(chainId))

          // Get balance
          window.ethereum
            .request({
              method: "eth_getBalance",
              params: [connectedAddress, "latest"],
            })
            .then((balance) => {
              const ethBalance = Number.parseInt(balance, 16) / 1e18
              setWalletBalance(ethBalance.toFixed(4))
            })
        }
      })

      // Cleanup
      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
        window.ethereum.removeListener("chainChanged", handleChainChanged)
      }
    }
  }, [isWalletInstalled])

  const handleCryptoSelect = (crypto) => {
    setSelectedCrypto(crypto)
    setDonationStep("amount")
  }

  const copyAddress = () => {
    if (selectedCrypto) {
      navigator.clipboard.writeText(selectedCrypto.address)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setDonationStep("confirm")
  }

  const resetDonation = () => {
    setSelectedCrypto(null)
    setAmount("")
    setDonationStep("select")
    setTransactionHash(null)
    setTransactionStatus(null)
  }

  const generateQRCode = () => {
    // In a real implementation, this would generate a QR code for the address
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${selectedCrypto.address}`
  }

  const donationPurposes = [
    { id: "general", name: "General Support" },
    { id: "education", name: "Educational Programs" },
    { id: "events", name: "Events & Workshops" },
    { id: "scholarships", name: "Scholarships" },
  ]

  // Format wallet address for display
  const formatAddress = (address) => {
    if (!address) return ""
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  // Get network name from chain ID
  const getNetworkName = (chainId) => {
    const networks = {
      "0x1": "Ethereum",
      "0xA": "Optimism",
      "0x89": "Polygon",
      "0x2105": "Base",
      "0xA4EC": "Celo",
    }
    return networks[chainId] || "Unknown Network"
  }

  return (
    <div className="content">
      <ContentHeader title="Donate" />

      <div className="donate-container">
        <div className="donate-header">
          <h1>Support She3 Africa</h1>
          <p>
            Your donations help us empower more African women in Web3 through education, mentorship, and community
            building.
          </p>

          {walletConnected && (
            <div className={`wallet-status connected ${adminMode ? "admin-wallet" : ""}`}>
              <div className="wallet-info">
                <span className="wallet-address">{formatAddress(walletAddress)}</span>
                <span className="wallet-network">{getNetworkName(walletChainId)}</span>
                {adminMode && <span className="admin-badge">Admin Wallet</span>}
              </div>
              {walletBalance && (
                <div className="wallet-balance">
                  <span>{walletBalance} ETH</span>
                </div>
              )}
              <button className="disconnect-btn" onClick={disconnectWallet}>
                Disconnect
              </button>
            </div>
          )}

          {!ORGANIZATION_WALLET.isConfigured && (
            <div className="wallet-config-warning">
              <p>
                ⚠️ Organization wallet not configured. Please set the VITE_ORGANIZATION_WALLET_ADDRESS environment
                variable.
              </p>
            </div>
          )}
        </div>

        <div className="donation-card">
          <div className="donation-card-inner">
            {donationStep === "select" && (
              <>
                <div className="donation-card-title">
                  <h2>She3 Africa donation</h2>
                  <p>Select a cryptocurrency</p>
                </div>

                <div className="crypto-list">
                  {displayedOptions.map((crypto) => (
                    <div key={crypto.id} className="crypto-option" onClick={() => handleCryptoSelect(crypto)}>
                      <div className="crypto-option-left">
                        <div className="crypto-logo">
                          <img src={crypto.logo || "/placeholder.svg"} alt={crypto.name} />
                        </div>
                        <div className="crypto-name">
                          <span>{crypto.name}</span>
                          <span className="crypto-symbol">({crypto.symbol})</span>
                        </div>
                      </div>
                      {crypto.type && <div className="crypto-type">{crypto.type}</div>}
                      <div className="crypto-arrow">›</div>
                    </div>
                  ))}

                  {!showAllOptions && cryptoOptions.length > 5 && (
                    <button className="show-more-btn" onClick={() => setShowAllOptions(true)}>
                      Show more
                    </button>
                  )}
                </div>
              </>
            )}

            {donationStep === "amount" && (
              <>
                <div className="donation-card-title">
                  <button className="back-button" onClick={() => setDonationStep("select")}>
                    ‹ Back
                  </button>
                  <h2>Donate with {selectedCrypto.name}</h2>
                </div>

                <div className="donation-form">
                  <div className="selected-crypto">
                    <div className="crypto-logo">
                      <img src={selectedCrypto.logo || "/placeholder.svg"} alt={selectedCrypto.name} />
                    </div>
                    <div className="crypto-name">
                      <span>{selectedCrypto.name}</span>
                      <span className="crypto-symbol">({selectedCrypto.symbol})</span>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="amount">Amount to donate</label>
                      <div className="amount-input">
                        <input
                          type="text"
                          id="amount"
                          placeholder="0.00"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          required
                        />
                        <span className="amount-symbol">{selectedCrypto.symbol}</span>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="purpose">Purpose of donation</label>
                      <select id="purpose" value={donationPurpose} onChange={(e) => setDonationPurpose(e.target.value)}>
                        {donationPurposes.map((purpose) => (
                          <option key={purpose.id} value={purpose.id}>
                            {purpose.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button type="submit" className="donate-btn">
                      Continue
                    </button>
                  </form>
                </div>
              </>
            )}

            {donationStep === "confirm" && (
              <>
                <div className="donation-card-title">
                  <button className="back-button" onClick={() => setDonationStep("amount")}>
                    ‹ Back
                  </button>
                  <h2>Complete your donation</h2>
                </div>

                <div className="donation-confirmation">
                  <div className="donation-summary">
                    <div className="summary-item">
                      <span>Amount:</span>
                      <span className="summary-value">
                        {amount} {selectedCrypto.symbol}
                      </span>
                    </div>
                    <div className="summary-item">
                      <span>Purpose:</span>
                      <span className="summary-value">
                        {donationPurposes.find((p) => p.id === donationPurpose)?.name}
                      </span>
                    </div>
                    {walletConnected && (
                      <div className="summary-item">
                        <span>From:</span>
                        <span className="summary-value">{formatAddress(walletAddress)}</span>
                      </div>
                    )}
                  </div>

                  {transactionStatus === "submitted" ? (
                    <div className="transaction-success">
                      <div className="success-icon">✓</div>
                      <h3>Transaction Submitted!</h3>
                      <p>Your donation has been submitted to the blockchain.</p>
                      <div className="transaction-details">
                        <span>Transaction Hash:</span>
                        <a
                          href={`https://etherscan.io/tx/${transactionHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hash-link"
                        >
                          {formatAddress(transactionHash)}
                        </a>
                      </div>
                      <button className="donate-btn" onClick={resetDonation}>
                        Make Another Donation
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="wallet-address-container">
                        <div className="qr-code">
                          <img src={generateQRCode() || "/placeholder.svg"} alt="QR Code" />
                        </div>

                        <div className="wallet-details">
                          <p>Send your donation to this address:</p>
                          <div className="address-box">
                            <span className="address">{selectedCrypto.address}</span>
                            <button className="copy-btn" onClick={copyAddress}>
                              {copied ? "Copied!" : "Copy"}
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="donation-actions">
                        {isConnecting ? (
                          <button className="connect-wallet-btn loading" disabled>
                            <span className="loading-spinner"></span> Connecting...
                          </button>
                        ) : walletConnected ? (
                          <button
                            className={`connect-wallet-btn ${transactionStatus === "pending" ? "loading" : ""}`}
                            onClick={sendTransaction}
                            disabled={transactionStatus === "pending"}
                          >
                            {transactionStatus === "pending" ? (
                              <>
                                <span className="loading-spinner"></span> Processing...
                              </>
                            ) : (
                              `Send ${amount} ${selectedCrypto.symbol}`
                            )}
                          </button>
                        ) : (
                          <button className="connect-wallet-btn" onClick={connectWallet}>
                            {isWalletInstalled ? "Connect Wallet" : "Install MetaMask"}
                          </button>
                        )}
                        <button className="reset-btn" onClick={resetDonation}>
                          Start Over
                        </button>
                      </div>

                      {connectionError && (
                        <div className="error-message">
                          <p>{connectionError}</p>
                          {!isWalletInstalled && (
                            <a
                              href="https://metamask.io/download/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="install-link"
                            >
                              Install MetaMask
                            </a>
                          )}
                        </div>
                      )}

                      <div className="donation-note">
                        <p>
                          After sending your donation, please allow some time for the transaction to be confirmed on the
                          blockchain. Thank you for supporting She3 Africa!
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="donation-impact">
          <h3>Your Impact</h3>
          <div className="impact-cards">
            <div className="impact-card">
              <div className="impact-icon">👩‍💻</div>
              <div className="impact-text">
                <h4>50+</h4>
                <p>Women trained in Web3 development</p>
              </div>
            </div>
            <div className="impact-card">
              <div className="impact-icon">🌍</div>
              <div className="impact-text">
                <h4>10+</h4>
                <p>African countries reached</p>
              </div>
            </div>
            <div className="impact-card">
              <div className="impact-icon">🚀</div>
              <div className="impact-text">
                <h4>15+</h4>
                <p>Web3 projects launched</p>
              </div>
            </div>
          </div>
        </div>

        <div className="donation-faq">
          <h3>Frequently Asked Questions</h3>
          <div className="faq-item">
            <h4>How are donations used?</h4>
            <p>
              Your donations directly support our educational programs, workshops, scholarships, and community events
              focused on empowering African women in Web3.
            </p>
          </div>
          <div className="faq-item">
            <h4>Can I donate other cryptocurrencies?</h4>
            <p>
              Yes! If you'd like to donate using a cryptocurrency not listed here, please contact us at
              donations@she3africa.org for wallet addresses.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Donate
