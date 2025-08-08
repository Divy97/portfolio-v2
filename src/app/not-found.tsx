import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 text-center">
      <div className="space-y-3">
        <h1 className="playwrite-hu-400 text-5xl">404</h1>
        <p className="work-sans-400 text-muted-foreground">Sorry, the page you are looking for does not exist.</p>
        <Link href="/" className="inline-block mt-2 bg-primary text-primary-foreground px-4 py-2 rounded-md work-sans-600">Go home</Link>
      </div>
    </main>
  );
} 