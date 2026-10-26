# Pre-Deployment Audit

Audit date: 26 October 2026  
Target: Vercel production deployment  
Final recommendation: **NOT READY**

## 1. Executive summary

The portfolio application is technically stable in its production build. The complete page was exercised in a real Chromium production preview at 320, 375, 390, 430, 768, 1024, 1440 and 1920 pixels. No horizontal overflow, broken local assets, runtime exceptions, console errors or failed production asset requests were found. GSAP/ScrollTrigger, Lenis, reduced-motion behavior, the mobile portrait reveal, project chapters and responsive layouts remain operational.

The site should not be published yet because the current LMS dashboard screenshot exposes identifiable student names and email addresses. The canonical URL, sitemap and absolute social-sharing image metadata must wait until the final production domain is known.

## 2. Critical issues

### Screenshot privacy approval is required

The displayed Private Tutoring LMS admin dashboard contains identifiable student names and email addresses in recent-login and activity panels. This content must be sanitized or explicitly approved by the relevant data owner before public publication.

Other screenshots requiring manual confirmation:

- NKS admin screenshots display the portfolio owner's public email address while logged in.
- Liya Savi admin screenshots show an administrator name and order identifiers.
- Project screenshots may contain client branding, operational statistics and product data; confirm permission to publish them.

No screenshot pixels were silently altered during this audit.

## 3. High-priority issues

### Source repository publication remains optional

The LMS and NKS GitHub CTAs were removed because their prior public URLs returned HTTP 404 for logged-out visitors. Publish those repositories and add verified URLs only if public source access is intended later. The GitHub profile and Liya Savi repository were publicly reachable.

### Production-domain metadata is incomplete by design

A canonical URL, `sitemap.xml`, `og:url` and absolute social preview image URL were not invented. Add them after the final Vercel domain or custom domain is confirmed.

### Git repository is not ready for Git-connected deployment

The repository has an `origin` remote and is on `main`, but there is no existing commit and the working tree consists of untracked project files. A reviewed initial commit and an authorized push are required before connecting Vercel through GitHub. No commit or push was performed.

## 4. Medium/low-priority issues

- Add a dedicated 1200×630 social-sharing image after the production domain is available, then add absolute `og:image` and `twitter:image` metadata.
- Perform a final physical-device check on iOS Safari and Android Chrome. Browser touch emulation passed, but it cannot fully reproduce mobile browser chrome, GPU behavior or assistive technology.
- Confirm the public phone number, email address, LinkedIn profile and WhatsApp destination immediately before launch. Their formats and redirects are valid in this audit.
- Google Fonts remain a third-party runtime dependency. Local fallbacks are present, and ScrollTrigger refreshes after fonts resolve.
- The production output is approximately 4.84 MiB, of which approximately 4.44 MiB is imagery. The largest emitted image is approximately 301 kB. This is reasonable for a screenshot-heavy case-study page, but real-world mobile-network testing is still recommended.
- Desktop links below 44px high are isolated text links with sufficient surrounding spacing; all tested mobile interactive targets meet the 44px audit threshold.

## 5. Fixes implemented

### Functionality and navigation

- Routed menu section navigation through the existing Lenis instance.
- Refreshed ScrollTrigger before navigation and added a final positional correction, fixing navigation that previously stopped before Work, Skills, Experience and Contact when crossing the pinned Story sequence.
- Added menu focus management, keyboard focus trapping, Escape-to-close behavior and focus restoration.
- Added explicit accessible labels to external project CTAs.
- Confirmed every `_blank` link uses `rel="noopener noreferrer"`.

### Responsive and accessibility

- Prevented mobile Contact heading words from splitting mid-word while leaving desktop typography unchanged.
- Increased the effective mobile targets for “Scroll to explore” and “Back to top”.
- Preserved the touch-driven radial portrait reveal and verified pointer drag/release behavior.
- Added reduced-motion guards to Hero, About, Contact and menu GSAP entrances.
- Preserved the existing reduced-motion Story alternative and disabled Lenis smooth scrolling when reduced motion is requested.
- Confirmed one `h1`, no duplicate IDs, complete image alt attributes and visible keyboard focus indicators.

### Performance

- Marked all 27 below-the-fold project screenshots as lazy-loaded with asynchronous decoding.
- Only three of 28 `<img>` elements load during the initial top-of-page test; all load successfully during complete-page scrolling.
- Preserved intrinsic image dimensions to avoid layout shifts. Initial-load cumulative layout shift measured `0` at every tested width.
- Added `.vercelignore` rules for local audit artifacts and unused raw screenshot/profile originals without removing source files.

### SEO and platform files

- Added accurate title/description, author, robots, Open Graph and Twitter/X summary metadata.
- Replaced the inline data favicon with `/favicon.svg`.
- Added `public/robots.txt`.
- Kept canonical, sitemap and absolute social-image metadata pending the real domain.

### Security and dependencies

- Scanned source and project configuration for common secret/key patterns; no credentials or environment files were found.
- Updated patched transitive tooling through `npm audit fix`.
- Vite is now 6.4.5; `npm audit` reports zero known vulnerabilities.

## 6. Files changed

- `.gitignore`
- `.vercelignore`
- `index.html`
- `package-lock.json`
- `public/favicon.svg`
- `public/robots.txt`
- `src/components/layout/Navigation.jsx`
- `src/components/projects/LiyaSaviCaseStudy.jsx`
- `src/components/projects/NksClothingCaseStudy.jsx`
- `src/components/projects/ProjectCaseStudy.jsx`
- `src/components/sections/About.jsx`
- `src/components/sections/Contact.jsx`
- `src/components/sections/Hero.jsx`
- `src/hooks/useLenis.js`
- `src/styles/global.css`
- `PRE_DEPLOYMENT_AUDIT.md`

Generated local QA evidence is stored in `artifacts/production-audit/` and excluded from Git/Vercel uploads.

## 7. Validation results

### Commands

- `npm run lint`: passed with zero errors and zero warnings.
- `npm run build`: passed using Vite 6.4.5; 1,639 modules transformed.
- `npm run preview -- --host 127.0.0.1 --port 4173`: served successfully with HTTP 200.
- `npm audit`: zero vulnerabilities.

### Browser coverage

Production-preview checks were completed at:

- 320×640
- 375×812
- 390×844
- 430×932
- 768×1024
- 1024×768
- 1440×900
- 1920×1080

Results:

- No horizontal document overflow at any tested width.
- No overflowing text/image/content elements detected.
- No broken or unloaded images after complete-page scrolling.
- No browser console errors, runtime exceptions or failed production asset requests.
- Hero, About, all LMS/Liya/NKS chapters, Skills, Experience and Contact were captured at representative mobile and desktop widths.
- Mobile menu opened, focused the first navigation item, trapped keyboard focus, closed with Escape and returned focus to the toggle.
- All five menu destinations landed at the correct section boundary in normal and reduced-motion modes.
- Mobile portrait pointer drag produced a moving feathered radial mask and reset cleanly on release.
- Reduced-motion mode showed static Hero content and the non-pinned Story alternative.
- Initial-load CLS was `0` at every tested width. Layout-shift values generated during synthetic programmatic full-page scrolling are not representative of user CLS because the audit scroll intentionally activates ScrollTrigger pin spacing without user input.

Detailed machine-readable results: `artifacts/production-audit/report.json`.

## 8. Manual testing still required

- Review/sanitize the LMS student data and confirm publication rights for every client screenshot.
- Confirm whether the LMS and NKS repositories should be public and correct their CTAs accordingly.
- Test on at least one physical iPhone/Safari device and one physical Android/Chrome device.
- Test VoiceOver or TalkBack navigation, especially the menu and portrait control.
- Confirm that email, phone and WhatsApp actions open the intended installed applications on real devices.
- Exercise the external LMS live application manually; this audit confirms reachability, not its authenticated workflows.
- Recheck LinkedIn and GitHub while logged out immediately before launch.

## 9. Remaining deployment blockers

1. Resolve or approve the identifiable information in project screenshots.
2. Confirm the final production domain, then add canonical, sitemap, `og:url` and absolute social-image metadata.
3. Review, commit and push the currently untracked repository files if using Vercel's Git integration.
4. Complete the physical-device checks listed above.

Recommended Vercel settings after those blockers are cleared:

- Framework preset: Vite
- Install command: `npm ci`
- Build command: `npm run build`
- Output directory: `dist`
- Node.js: current Vercel-supported Node 20 LTS or newer compatible LTS
- Environment variables: none currently required
- SPA rewrite: not required for the current single-page hash/section navigation; add one only if client-side pathname routes are introduced later

## 10. Final recommendation

**NOT READY**

The application code and production build are stable, responsive and close to launch quality. Publication should wait for screenshot privacy approval, final-domain metadata and physical-device confirmation.
