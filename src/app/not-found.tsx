import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[50vh] max-w-lg flex-col justify-center px-6 py-16 text-center">
      <p className="text-sm font-medium text-violet-600">404</p>
      <h1 className="mt-2 font-display text-2xl font-semibold text-slate-900 dark:text-slate-100">
        Page not found
      </h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">
        This page does not exist.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex justify-center rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white hover:bg-violet-500"
      >
        Back to home
      </Link>
    </main>
  );
}
