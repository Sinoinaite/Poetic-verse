import { useState, useEffect, useRef } from "react";
import { toPng } from "html-to-image";
import { supabase } from "./supabase";

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
  const [isLoadingSharedPoem, setIsLoadingSharedPoem] = useState(false);
  const [sharedPoemError, setSharedPoemError] = useState("");

  const sharedCardRef = useRef(null);
  const editorRef = useRef(null);

  // Check whether the current URL is a shared poem URL:
  // /p/abc123
  const pathParts = window.location.pathname
    .split("/")
    .filter(Boolean);

  const sharedPoemId =
    pathParts[0] === "p" && pathParts[1]
      ? pathParts[1]
      : null;

  // Load shared poem from Supabase,
  // otherwise restore unfinished poem from localStorage
  useEffect(() => {
    const loadPoem = async () => {
      if (sharedPoemId) {
        setIsSharedView(true);
        setIsLoadingSharedPoem(true);

        const { data, error } = await supabase
          .from("poems")
          .select("title, content")
          .eq("id", sharedPoemId)
          .single();

        if (error || !data) {
          console.error("Could not load shared poem:", error);
          setSharedPoemError("This poem could not be found.");
          setIsLoadingSharedPoem(false);
          return;
        }

        setTitle(data.title || "");
        setPoem(data.content || "");
        setIsLoadingSharedPoem(false);
        return;
      }

      const savedTitle =
        localStorage.getItem(TITLE_KEY);

      const savedPoem =
        localStorage.getItem(POEM_KEY);

      if (savedTitle) {
        setTitle(savedTitle);
      }

      if (savedPoem) {
        setPoem(savedPoem);
      }
    };

    loadPoem();
  }, [sharedPoemId]);

  // Autosave title locally only when creating a poem
  useEffect(() => {
    if (!sharedPoemId) {
      localStorage.setItem(TITLE_KEY, title);
    }
  }, [title, sharedPoemId]);

  // Autosave poem locally only when creating a poem
  useEffect(() => {
    if (!sharedPoemId) {
      localStorage.setItem(POEM_KEY, poem);
    }
  }, [poem, sharedPoemId]);

  const handleClear = () => {
    setTitle("");
    setPoem("");

    localStorage.removeItem(TITLE_KEY);
    localStorage.removeItem(POEM_KEY);
  };

  // Save poem to Supabase and generate short link
  const handleShare = async () => {
    if (!title.trim() && !poem.trim()) {
      alert("Write a poem before sharing.");
      return;
    }

    // Generate a short unique ID
    const id = crypto.randomUUID()
      .replace(/-/g, "")
      .slice(0, 8);

    const { error } = await supabase
      .from("poems")
      .insert([
        {
          id: id,
          title: title,
          content: poem,
        },
      ]);

    if (error) {
      console.error("Could not save poem:", error);

      alert(
        "Something went wrong while creating the share link."
      );

      return;
    }

    const shareUrl =
      `${window.location.origin}/p/${id}`;

    try {
      await navigator.clipboard.writeText(
        shareUrl
      );

      alert("Share link copied to clipboard!");
    } catch {
      window.prompt(
        "Copy your poem link:",
        shareUrl
      );
    }
  };

  // Download shared poem as PNG
  const handleDownload = async () => {
    if (!sharedCardRef.current) {
      return;
    }

    try {
      const dataUrl = await toPng(
        sharedCardRef.current,
        {
          quality: 1,
          pixelRatio: 2,
          backgroundColor: "#F3EFE9",
        }
      );

      const link =
        document.createElement("a");

      const safeTitle =
        title
          .trim()
          .replace(/[^a-z0-9]/gi, "-")
          .toLowerCase() || "poem";

      link.download =
        `${safeTitle}-poetic-verse.png`;

      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error(
        "Could not download poem:",
        error
      );

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

  // -----------------------------
  // SHARED POEM VIEW
  // -----------------------------

  if (isSharedView) {
    return (
      <div className="page shared-page">
        <Header />

        <main className="shared-poem-view">
          {isLoadingSharedPoem ? (
            <p className="shared-label">
              Opening your poem...
            </p>
          ) : sharedPoemError ? (
            <p className="shared-label">
              {sharedPoemError}
            </p>
          ) : (
            <>
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
            </>
          )}
        </main>

        <footer className="site-footer">
          <p>
            Poetic Verse — crafted by Emba
          </p>
        </footer>
      </div>
    );
  }

  // -----------------------------
  // CREATOR VIEW
  // -----------------------------

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