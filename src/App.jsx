import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [news, setNews] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

useEffect(() => {
  const fetchNews = async () => {
    setLoading(true);
    setError("");

    try {
      const rssUrl =
        "https://news.google.com/rss?hl=en-IN&gl=IN&ceid=IN:en";

      const response = await fetch(
        `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`
      );

      if (!response.ok) {
        throw new Error("Unable to fetch news");
      }

      const data = await response.json();

      if (data.status !== "ok") {
        throw new Error("News service unavailable");
      }

      setNews(data.items.slice(0, 8));
    } catch (err) {
      setError("Unable to load live headlines. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  fetchNews();
}, []);
    const speakNews = () => {
    window.speechSynthesis.cancel();

    const news = new SpeechSynthesisUtterance(
      "Good evening! Welcome to News Live 24/7. " +
      "Here are today's top headlines. " +
      "Stay tuned for national news, international news, " +
      "sports and entertainment updates."
    );

    news.lang = "en-IN";
    news.rate = 0.9;
    news.pitch = 1;

    window.speechSynthesis.speak(news);
  };
  const [started, setStarted] = useState(false);

  return (
    <div className="app">
      <header className="topbar">
        <h1>NEWS<span>LIVE</span></h1>
        <div className="live">
          <span className="live-dot"></span> LIVE 24/7
        </div>
        <div className="date">{new Date().toDateString()}</div>
      </header>

      {!started ? (
        <section className="welcome">
          <div className="welcome-content">
            <div className="studio-icon">📺</div>
            <p className="eyebrow">YOUR TRUSTED NEWS NETWORK</p>
            <h1>THE WORLD.<br /><span>IN ONE PLACE.</span></h1>
            <p>Breaking news, top headlines and stories that matter.</p>
            <button onClick={() => setStarted(true)}>
              ▶ CLICK ME TO WATCH
            </button>
          </div>
        </section>
      ) : (
        <main>
          <div className="breaking">
            <strong>🔴 BREAKING NEWS</strong>
            <marquee>
              Welcome to News Live 24/7 • Your daily news destination •
              Stay informed, stay updated!
            </marquee>
          </div>

          <section className="studio">
            <div className="studio-label">NEWS LIVE STUDIO</div>

            <div className="reporters">
              <div className="reporter">
                <div className="character">👨🏻‍💼</div>
                <h2>ARJUN</h2>
                <p>Senior News Anchor</p>
              </div>

              <div className="news-screen">
                <div className="screen-logo">NEWS LIVE</div>
                <h1>TOP<br />HEADLINES</h1>
                <p>THE WORLD AT YOUR FINGERTIPS</p>
                <div className="screen-bottom">LIVE BROADCAST</div>
              </div>

              <div className="reporter">
                <div className="character">👩🏻‍💼</div>
                <h2>PRIYA</h2>
                <p>News Correspondent</p>
              </div>
            </div>

            <div className="anchor-text">
              <button className="voice-btn" onClick={speakNews}>
  🎙️ LISTEN TO NEWS
</button>
              <h2>Good Evening! Welcome to News Live.</h2>
              <p>
                We bring you the latest headlines and important
                stories from around the world.
              </p>
            </div>
          </section>

          <section className="headlines">
            <h2>📰 TODAY'S TOP HEADLINES</h2>

            <div className="news-grid">
              <article>
                <span>🌍 NATIONAL</span>
                <h3>Latest National News</h3>
                <p>Important updates from across the country.</p>
              </article>

              <article>
                <span>🌎 INTERNATIONAL</span>
                <h3>World News Update</h3>
                <p>Discover what's happening around the world.</p>
              </article>

              <article>
                <span>⚽ SPORTS</span>
                <h3>Sports Headlines</h3>
                <p>Latest sports stories and match updates.</p>
              </article>

              <article>
                <span>🎬 ENTERTAINMENT</span>
                <h3>Entertainment Buzz</h3>
                <p>Movies, celebrities and entertainment news.</p>
              </article>
            </div>
          </section>

          <footer>
            © 2026 NEWS LIVE 24/7 | YOUR WORLD, YOUR NEWS
          </footer>
        </main>
      )}
    </div>
  );
}

export default App;