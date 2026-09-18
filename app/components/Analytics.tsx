"use client";

import { useEffect } from "react";
import { initAnalytics } from "@/app/lib/analytics";

// POSTHOG_KEY has no NEXT_PUBLIC_ prefix, so it never reaches the client
// bundle. The server layout reads it and passes it down here, which is where
// the browser SDK gets started.
export default function Analytics({ apiKey }: { apiKey: string }) {
  useEffect(() => {
    initAnalytics(apiKey);
  }, [apiKey]);

  return null;
}
