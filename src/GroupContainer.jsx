export default function GroupContainer({ label, books }) {
  // TODO: render BookCard for each item, with stable keys.
  return (
    <section className="group" aria-label={label}>
      <h3>{label}</h3>
    </section>
  );
}
