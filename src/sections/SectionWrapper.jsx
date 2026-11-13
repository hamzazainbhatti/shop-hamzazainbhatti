export default function SectionWrapper({ heading, subheading, children }) {
  return (
    <section className="mx-2 flex flex-col gap-2 rounded-lg bg-card p-2 lg:p-6">
      <div className="mb-8">
        <h2 className="px-2 text-[min(96px,11.4vw)] font-thin">{heading}</h2>
        <p className="ml-2 px-2 text-[min(1.25rem,2.5vw)] font-semibold text-primary/50">
          {subheading}
        </p>
      </div>
      {children}
    </section>
  );
}
