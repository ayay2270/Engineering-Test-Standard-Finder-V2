# Engineering Test Standard Finder V2

Clean-slate local Vite / React / TypeScript app. No backend or remote repository is configured.

Run `npm install`, then `npm run dev`. Verify with `npm run lint`, `npm test`, and `npm run build`.

ISTA, ASTM, IEC, and ISO logos are rendered through the shared `StandardFamilyLogo` component in `src/App.tsx`. The provided attachment contained the four marks on a single `logo-preview.png` sheet rather than individual PNGs, so the four files under `src/assets/standards/` were extracted from that sheet using `scripts/extract-preview-logos.ps1`. Replace them with the individual finalized PNG exports if those become available.

ISTA 3B has 13 supplied sequence steps in `src/data/standards.ts`. Other standards intentionally have empty sequences pending verified data. Library data is stored locally in the browser under `etsf-v2-library`.
