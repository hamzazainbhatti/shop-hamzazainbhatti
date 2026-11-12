import Button from "@/components/ui/Button";
import { socialMediaPosts } from "@/data/tees";
import { twMerge } from "cn";

const SHORT = "h-56";
const TALL = "h-80";

export default function SocialMediaGallery({ className }) {
  const columns = [
    [socialMediaPosts[0], socialMediaPosts[1]],
    [socialMediaPosts[2], socialMediaPosts[3]],
    [socialMediaPosts[4], socialMediaPosts[5]],
  ];

  return (
    <div className={twMerge("flex gap-4 self-stretch", className)}>
      {columns.map((posts, col) => (
        <div key={col} className="flex min-w-0 flex-1 flex-col gap-4">
          {posts.map((post, row) => (
            <div
              key={post.image}
              className={twMerge(
                "overflow-hidden rounded-lg [&>*]:h-full [&>*]:w-full [&>*]:object-cover",
                (col + row) % 2 === 0 ? SHORT : TALL,
              )}
            >
              <div
                className="relative bg-cover bg-center"
                style={{ backgroundImage: `url(${post.image})` }}
              >
                <Button
                  to={post.link}
                  target="_blank"
                  flavour="icon"
                  icon="arrowRight"
                  iconClassName="w-8 h-8 -rotate-45"
                  className="absolute bottom-2 right-2 bg-card h-10 w-10 transition-colors duration-200 hover:text-card hover:bg-card-foreground"
                />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
