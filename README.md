# Jenny Rose Perez — 3D Portfolio

A dark futuristic, responsive React + Vite portfolio with React Three Fiber, Three.js, Drei, Framer Motion, and Lucide icons.

## Requirements
- Node.js 20.19+ or 22.12+ (recommended for Vite 6 compatibility)
- npm

## Run locally
```bash
npm install
npm run dev
```
Open the local URL shown in your terminal (usually http://localhost:5173).

## Production build
```bash
npm run build
npm run preview
```
Upload the generated `dist/` folder to a static host or deploy the repo on Vercel/Netlify.

## Customize before publishing
1. Open `src/App.jsx` and update `profile.email`, `profile.github`, and `profile.linkedin`.
2. The résumé download uses `public/resume.pdf`. Replace that file whenever Jenny's résumé is updated.
3. Update each project's `link` field to your real GitHub repository or live demo URL. Empty links display 'available upon request'.
4. Edit project descriptions and tech stacks to match the final implemented features.
5. Replace the generated project visuals with screenshots if you wish.
6. Update `index.html` title and description if desired.
7. Jenny's portrait is stored at `public/jenny-portrait.png`. Replacing that file updates the floating, liquid-effect hero portrait while keeping the colored rings.
8. Submit the contact form once, then open the activation email sent by FormSubmit to `profile.email` and confirm it. Messages will be forwarded after activation.

## Notes
- The 3D rings are rendered using WebGL; reduced-motion preference stops the portrait animation.
- The contact form sends through FormSubmit. The email icon also opens your email app as a backup.
- Google Fonts requires internet; the page has system fallbacks.
- The app does not require API keys.
