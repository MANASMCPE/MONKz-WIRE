# MONKz WIRE — Vercel hosting

Files:
- index.html  → key page (unlock with any key starting with MONK-FFH4X)
- main.html   → features / hacks page (opens after unlock)
- store.html  → plans & prices (BUY PANEL opens this; BUY NOW → Discord)
- vercel.json → hosting config

## Deploy (easiest)
1. Go to vercel.com → Add New → Project
2. Drag & drop this whole folder
3. Deploy. Done — index.html is the home page.

## Deploy (terminal)
    npm i -g vercel
    cd ff-panel
    vercel --prod

## Edit
- Key prefix: top of the <script> in index.html (KEY_PREFIX)
- Discord / Buy link: DISCORD_URL in index.html and main.html
- Hacks / sections: FEATURES list in main.html
- Download link: DOWNLOAD_URL in main.html
- Plans / prices: PLANS list at top of the script in store.html
