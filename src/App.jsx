import { useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [shortId, setShortId] = useState("");

  const handleClick = async () => {
    try {
      const res = await fetch("http://localhost:5000/shorturl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();
      console.log(data);
      setShortId(data.id);
    } catch (e) {
      console.log("Error:", e);
    }
  };

  return (
    <>
      <div>
        <h1 className="bg-zinc-300">URL Shortener</h1>
      </div>
      <div>
        <label>Please enter the URL: </label>
        <input
          type="text"
          placeholder="Enter a URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          className="p-5 m-5 rounded-2xl bg-slate-300"
          onClick={handleClick}
        >
          Generate
        </button>
      </div>
      {shortId && (
        <p>
          Short URL:{" "}
          <a
            href={`http://localhost:5000/${shortId}`}
            target="_blank"
            rel="noreferrer"
          >
            http://localhost:5000/{shortId}
          </a>
        </p>
      )}
    </>
  );
}

export default App;
