import teach from "../assets/teach.png"

const Classed = [
  {
    image: teach,
    head: "Web3 Workshops",
    body: "Hands-on learning experiences covering blockchain fundamentals, cryptocurrency, and decentralized applications.",
  },
  {
    image: teach,
    head: "University Outreach",
    body: "Partnering with universities across Africa to introduce students to Web3 career opportunities.",
  },
  { image: teach, head: "Webinars", body: "Educating women about Web3 on our X, Telegram and Discord platforms" },
  {
    image: teach,
    head: "Competition and Incentive Programs",
    body: "Blockchain challenges to solve real world problems with Web3 solutions.",
  },
]

export default function Programs() {
  return (
    <div className="teachers--content">
      <div className="Program--List">
        <div className="list--header">
          <h1>Our Programs</h1>
          <p>She3 offers various programs designed to educate, connect, and empower women in the Web3 space</p>
        </div>
        <div className="list--container">
          {Classed.map(({ image, head, body }) => (
            <div className="list">
              <div className="list--text">
                <h2>{head}</h2>
                {/* //.........regular expressions */}
                {head == "Webinars" ? (
                  <p>
                    `Educating women about Web3 on our{" "}
                    <a target="_blank" href="https://x.com/sheweb3" className="Link" rel="noreferrer">
                      X
                    </a>{" "}
                    and{" "}
                    <a href="#" className="Link">
                      Discord
                    </a>{" "}
                    platforms`
                  </p>
                ) : (
                  <p>{body}</p>
                )}
              </div>

              <img src={image} alt={head} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
