export default function AnnouncementBar({
  message = "11:11 SALE LIVE NOW. ALL ITEMS ARE BUY 1 GET 1 FREE!.",
}) {
  return (
    <div
      aria-label="Announcement"
      className="relative z-50 flex h-8 items-center justify-center bg-primary px-4 text-center font-sans text-[0.625rem] font-medium tracking-[0.12em] text-primary-foreground"
    >
      {message}
    </div>
  );
}
