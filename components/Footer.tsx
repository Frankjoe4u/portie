"use client";

export default function Footer() {
  const openApp = (appUrl: string, webUrl: string) => {
    window.location.href = appUrl;
    setTimeout(() => {
      window.location.href = webUrl;
    }, 1000);
  };

  return (
    <footer className="py-10 px-6 bg-white dark:bg-[#0d0020] border-t border-purple-200 dark:border-[rgba(124,58,237,0.3)]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h3 className="text-gray-900 dark:text-white text-xl font-extrabold">
            Frank <span className="text-yellow-500 dark:text-yellow-400">Joe</span>
          </h3>
          <p className="text-gray-500 text-sm mt-1">Full Stack Web Developer</p>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="#"
            className="text-gray-600 dark:text-gray-400 text-sm hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors"
          >
            Home
          </a>
          <a
            href="#services"
            className="text-gray-600 dark:text-gray-400 text-sm hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors"
          >
            Services
          </a>
          <a
            href="#projects"
            className="text-gray-600 dark:text-gray-400 text-sm hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors"
          >
            Projects
          </a>
          <a
            href="#contact"
            className="text-gray-600 dark:text-gray-400 text-sm hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors"
          >
            Contact
          </a>
        </div>

        <div className="flex items-center gap-4">
          {/* GitHub */}
          <button
            onClick={() =>
              openApp(
                "github://github.com/Frankjoe4u",
                "https://github.com/Frankjoe4u",
              )
            }
            className="text-gray-600 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors cursor-pointer bg-transparent border-none p-0"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </button>

          {/* Email — mailto already opens mail app natively */}
          <a
            href="mailto:frankjoe4u@gmail.com"
            className="text-gray-600 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
          </a>

          {/* X / Twitter */}
          <button
            onClick={() =>
              openApp(
                "fb://facewebmodal/f?href=https://www.facebook.com/share/1Dt4jgV23R",
                "https://www.facebook.com/share/1Dt4jgV23R",
              )
            }
            className="text-gray-500 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors cursor-pointer bg-transparent border-none p-0"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
          </button>

          {/* Facebook */}
          <button
            onClick={() =>
              openApp(
                "twitter://user?screen_name=FJ_AirMayCar",
                "https://x.com/FJ_AirMayCar",
              )
            }
            className="text-gray-600 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors cursor-pointer bg-transparent border-none p-0"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-purple-200 dark:border-[rgba(124,58,237,0.15)]">
        <p className="text-center text-gray-500 dark:text-gray-600 text-sm">
          2026 Frank Joe. All rights reserved.
        </p>
      </div>
    </footer>
  );
}