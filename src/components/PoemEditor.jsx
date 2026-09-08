export default function PoemEditor({ title, poem, onTitleChange, onPoemChange, onClear,onShare, }) {
  return (
    <div className="editor">
      <h2 className="section-label">Write</h2>
      <input
        type="text"
        className="title-input"
        placeholder="Give your poem a title"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
      />
      <textarea
        className="poem-input"
        placeholder="Let the words come as they are..."
        value={poem}
        onChange={(e) => onPoemChange(e.target.value)}
        rows={12}
      />
      <button type="button" className="btn btn-ghost" onClick={onClear}>
        Clear poem
      </button>
      <button
        className="btn btn-share"
       onClick={onShare}
        type="button"
      >
          Share Poem
      </button>
    </div>
  );
}