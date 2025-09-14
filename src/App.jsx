import { useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [shortId, setShortId] = useState("");
  const [error, setError] = useState(false);
  const handleClick = async () => {
    try {
      const res = await fetch("http://localhost:5000/shorturl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });
      if (res.status == 400) {
        setError(true);
        return;
      }
      setError(false);

      const data = await res.json();
      console.log(data);
      setShortId(data.id);
    } catch (e) {
      console.log("Error:", e);
    }
  };

  return (
    <div className="min-h-screen bg-cyan-900 p-4">
      <div className="max-w-md mx-auto">
        <h1 className="bg-zinc-300 p-4 mx-auto flex justify-center text-lg font-bold rounded-lg mb-6">
          URL Shortener
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <label className=" text-gray-700 font-medium mb-2">
            Please enter the URL:
          </label>
          <input
            type="text"
            placeholder="Enter a URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-cyan-700"
          />
          <button
            className="w-full p-3 bg-slate-300 hover:bg-slate-400 rounded-lg font-medium transition-colors"
            onClick={handleClick}
          >
            Generate
          </button>
        </div>
        {shortId && (
          <div className="bg-white p-4 rounded-lg shadow-lg mt-4">
            <p className="text-gray-700">
              Short URL:{" "}
              <a
                href={`http://localhost:5000/${shortId}`}
                target="_blank"
                rel="noreferrer"
                className="text-slate-600 hover:text-blue-800 underline"
              >
                http://localhost:5000/{shortId}
              </a>
            </p>
          </div>
        )
        }
        {
          error && (
            <div className="bg-red-200 p-4 rounded-lg shadow-lg mt-4">
              <p className="text-red-700">
                ⚠️enter the URL!!
              </p>
            </div>

          )
        }
      </div>
    </div>
  );
}

export default App;