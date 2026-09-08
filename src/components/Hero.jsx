export default function Hero({ onStart }) {
  return (
    <section className="hero">
      <h1>Turn your words into something worth sharing.</h1>
      <p>Write a poem. Give it a feeling. Share it with someone.</p>
      <button className="btn btn-primary" onClick={onStart}>
        Create a Poem
      </button>
    </section>
  );
}