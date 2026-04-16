export default function imageUrlFormatter(imagePath: string) {
  return `https://firebasestorage.googleapis.com/v0/b/fire-homes-5f6dd.firebasestorage.app/o/${encodeURIComponent(imagePath)}?alt=media`
}