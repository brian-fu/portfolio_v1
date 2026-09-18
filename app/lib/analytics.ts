import posthog from "posthog-js";

// The project key is a server-only variable, so it can't be read from here.
// <Analytics /> reads it on the server and hands it in at mount instead.
let ready = false;

export function initAnalytics(key: string) {
  if (ready) return;
  posthog.init(key, {
    // Events go through the /ingest rewrite in next.config.ts rather than
    // straight to posthog.com, which content blockers drop by default.
    api_host: "/ingest",
    ui_host: "https://us.posthog.com",
    // Opts into the current SDK defaults. Among other things this treats
    // localhost as an internal user, so dev traffic is filterable.
    defaults: "2026-08-30",
    // Implied by the defaults above, but stated because it is the setting
    // that makes app-router navigations count as pageviews.
    capture_pageview: "history_change",
    // Autocapture records every link and button click on its own, so most of
    // the site needs no tracking code. Elements without text carry a
    // data-ph-capture-attribute-name so they're readable in the dashboard.
    autocapture: true,
  });
  ready = true;
}

// Autocapture covers links and buttons on its own; this is for the things it
// can't see, like a chat reply coming back. No-ops before init so callers
// don't have to check.
export function capture(event: string, properties?: Record<string, unknown>) {
  if (ready) posthog.capture(event, properties);
}
