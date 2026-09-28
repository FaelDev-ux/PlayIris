import { AuthPresentation } from "./AuthPresentation.jsx";

export function AuthLayout({ children, headingId }) {
  return (
    <main className="mx-auto grid min-h-[calc(100vh-8px)] max-w-7xl grid-cols-1 lg:grid-cols-[1.15fr_0.85fr]">
      <AuthPresentation />

      <section
        className="flex items-center justify-center px-8 py-4"
        aria-labelledby={headingId}
      >
        {children}
      </section>
    </main>
  );
}
