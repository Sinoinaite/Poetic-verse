export default function PoemPreview({ title, poem }) {
  const hasContent = title.trim() || poem.trim();

  return (
    <div className="preview">
      <h2 className="section-label">Preview</h2>
      <div className="paper">
        {hasContent ? (
          <>
            {title.trim() && <h3 className="paper-title">{title}</h3>}
            <p className="paper-poem">{poem || " "}</p>
          </>
        ) : (
          <p className="paper-empty">Your poem will appear here as you write it.</p>
        )}
      </div>
    </div>
  );
}