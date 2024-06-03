export default function LoginLayout({ children }) {
    return (
      <section className="bg-gradient-to-b from-purple-950 to-black h-screen text-white">
        <main className="flex h-screen flex-col items-center justify-center p-24">
          <div className="mx-auto w-2/6 px-6 py-12 bg-white bg-opacity-60 rounded-md border-0 shadow-lg sm:rounded-3xl2">
            {children}
          </div>
        </main>
      </section>
    );
  }
  