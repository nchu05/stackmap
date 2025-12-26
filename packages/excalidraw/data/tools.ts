import { ToolItem } from "./ToolItem";

export const TOOLS: readonly ToolItem[] = [
  {
    name: "GitHub",
    image: "/tool-icons/github.png",
    color: "#ffffffff",
    scale: 1,
  },
  {
    name: "MongoDB",
    image: "/tool-icons/mongodb.png",
    color: "#ffffffff",
    scale: 0.5,
  },
  {
    name: "React",
    image: "/tool-icons/react.png",
    color: "#ffffffff",
    scale: 1,
  },
  {
    name: "Docker",
    image: "/tool-icons/docker.png",
    color: "#ffffffff",
    scale: 0.45,
  },
  {
    name: "PostgreSQL",
    image: "/tool-icons/postgresql.png",
    color: "#ffffffff",
    scale: 0.85,
  },
  {
    name: "Redis",
    image: "/tool-icons/redis.png",
    color: "#ffffffff",
    scale: 0.65,
  },
  {
    name: "Vercel",
    image: "/tool-icons/vercel.png",
    color: "#ffffffff",
    scale: 0.4,
  },
  {
    name: "Cloudflare",
    image: "/tool-icons/cloudflare.png",
    color: "#ffffffff",
    scale: 0.6,
  },
] as const;
