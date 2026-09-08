import { useState, useEffect, useRef } from "react";
import { toPng } from "html-to-image";
import LZString from "lz-string";
import Header from "./components/Header";
import Hero from "./components/Hero";
import PoemEditor from "./components/PoemEditor";
import PoemPreview from "./components/PoemPreview";
import "./App.css";

const TITLE_KEY = "poeticVerseTitle";
const POEM_KEY = "poeticVersePoem";

function App() {
  const [title, setTitle] = useState("");
  const [poem, setPoem] = useState("");
  const [isSharedView, setIsSharedView] = useState(false);

  const sharedCardRef = useRef(null);
  const editorRef = useRef(null);

  // Restore shared poem from URL, otherwise restore local saved poem
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedPoem = params.get("p");

    if (sharedPoem) {
      try {
        const decompressed = LZString.decompressFromEncodedURIComponent(sharedPoem);
        const decoded = JSON.parse(decompressed);
        
        setTitle(decoded.title || "");
        setPoem(decoded.poem || "");
        setIsSharedView(true);
        return;
      } catch (error) {
        console.error("Could not open shared poem:", error);
      }
    }

    const savedTitle = localStorage.getItem(TITLE_KEY);
    const savedPoem = localStorage.getItem(POEM_KEY);

    if (savedTitle) {
      setTitle(savedTitle);
    }

    if (savedPoem) {
      setPoem(savedPoem);
    }
  }, []);

  // Autosave title
  useEffect(() => {
    if (!isSharedView) {
      localStorage.setItem(TITLE_KEY, title);
    }
  }, [title, isSharedView]);

  // Autosave poem
  useEffect(() => {
    if (!isSharedView) {
      localStorage.setItem(POEM_KEY, poem);
    }
  }, [poem, isSharedView]);

  const handleClear = () => {
    setTitle("");
    setPoem("");

    localStorage.removeItem(TITLE_KEY);
    localStorage.removeItem(POEM_KEY);
  };

  const handleShare = async () => {
  if (!title.trim() && !poem.trim()) {
    alert("Write a poem before sharing.");
    return;
  }

  const poemData = {
    title,
    poem,
  };

  const compressedPoem = LZString.compressToEncodedURIComponent(
    JSON.stringify(poemData)
  );

  const shareUrl =
    `${window.location.origin}${window.location.pathname}?p=${compressedPoem}`;

  try {
    await navigator.clipboard.writeText(shareUrl);
    alert("Share link copied to clipboard!");
  } catch {
    window.prompt("Copy your poem link:", shareUrl);
  }
};

  const handleDownload = async () => {
    if (!sharedCardRef.current) {
      return;
    }

    try {
      const dataUrl = await toPng(sharedCardRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: "#F3EFE9",
      });

      const link = document.createElement("a");

      const safeTitle =
        title
          .trim()
          .replace(/[^a-z0-9]/gi, "-")
          .toLowerCase() || "poem";

      link.download = `${safeTitle}-poetic-verse.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Could not download poem:", error);

      alert(
        "Something went wrong while creating the image."
      );
    }
  };

  const scrollToEditor = () => {
    editorRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  // Shared poem view
  if (isSharedView) {
    return (
      <div className="page shared-page">
        <Header />

        <main className="shared-poem-view">
          <p className="shared-label">
            A poem shared with you
          </p>

          <div
            className="shared-card-capture"
            ref={sharedCardRef}
          >
            <PoemPreview
              title={title}
              poem={poem}
            />
          </div>

          <button
            className="btn btn-download"
            onClick={handleDownload}
            type="button"
          >
            Download as Image
          </button>
        </main>

        <footer className="site-footer">
          <p>
            Poetic Verse — crafted by Emba
          </p>
        </footer>
      </div>
    );
  }

  // Normal creator view
  return (
    <div className="page">
      <Header />

      <Hero onStart={scrollToEditor} />

      <div
        className="workspace"
        ref={editorRef}
      >
        <PoemEditor
          title={title}
          poem={poem}
          onTitleChange={setTitle}
          onPoemChange={setPoem}
          onClear={handleClear}
          onShare={handleShare}
        />

        <PoemPreview
          title={title}
          poem={poem}
        />
      </div>

      <footer className="site-footer">
        <p>
          Poetic Verse — crafted by Emba
        </p>
      </footer>
    </div>
  );
}

export default App;