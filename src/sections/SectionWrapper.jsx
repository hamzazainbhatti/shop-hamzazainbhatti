export default function SectionWrapper({ heading, subheading, children }) {
  return (
    <section className="m-2 flex flex-col gap-2 rounded-xl bg-card p-6">
      <div className="mb-8">
        <h2 className="px-2 text-8xl font-thin">{heading}</h2>
        <p className="ml-2 px-2 text-xl font-semibold text-primary/50">
          {subheading}
        </p>
      </div>
      {children}
    </section>
  );
}
