"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white">
          <h2 className="text-xl font-semibold text-gray-900">
            Etwas ist schiefgelaufen!
          </h2>
          <p className="text-gray-600">
            Wir wurden benachrichtigt und arbeiten daran.
          </p>
          <button
            onClick={() => reset()}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Erneut versuchen
          </button>
        </div>
      </body>
    </html>
  );
}
