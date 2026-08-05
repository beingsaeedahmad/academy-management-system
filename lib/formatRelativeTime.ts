export function formatRelativeTime(timestamp: string): string {
  const now = Date.now();
  const then = new Date(timestamp).getTime();
  const diffSec = Math.floor((now - then) / 1000);

  if (diffSec < 60) return "Just now";
  if (diffSec < 3600) {
    const mins = Math.floor(diffSec / 60);
    return `${mins} minute${mins === 1 ? "" : "s"} ago`;
  }
  if (diffSec < 86400) {
    const hours = Math.floor(diffSec / 3600);
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  }
  if (diffSec < 604800) {
    const days = Math.floor(diffSec / 86400);
    return `${days} day${days === 1 ? "" : "s"} ago`;
  }

  return new Date(timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
