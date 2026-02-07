/**
 * Present at root so Hostinger (and similar) detect this repo as Next.js.
 * The actual app deployed on Hostinger is apps/website (site principal + admin).
 * Build/Start commands must be set in the host panel to use the website app.
 */
module.exports = {
  // Real config is in apps/website/next.config.js
  reactStrictMode: true,
}
