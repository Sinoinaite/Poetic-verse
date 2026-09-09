# ✦ Poetic Verse

Poetic Verse is a web application for creating, previewing, sharing, and downloading poems.

The project was designed as a lightweight poetry-sharing experience with a vintage-inspired visual style. Users can write a poem without creating an account, their work is automatically saved in the browser as they write, and they can generate a shareable link that lets another person view and download the finished poem.

**Live site:** [poeticverses.vercel.app](https://poeticverses.vercel.app)

## ✨ Features

- Create poems with a title and body
- Live poem preview
- Automatic saving using browser localStorage — work survives a page refresh
- Clear saved poems
- Generate shareable poem links
- Open shared poems in a dedicated read-only view
- Download shared poems as PNG images
- Responsive design for desktop and mobile
- No login or account required

## 🎨 Design

Poetic Verse uses a vintage, romantic poetry-book aesthetic with a custom colour palette:

- Mauve `#9F7E99`
- Deep Blue-Grey `#3B424B`
- Warm Cream `#F3EFE9`
- Antique Gold `#D3A537`
- Soft Lavender `#D1BCD6`

## 🛠️ Technologies

- React
- JavaScript
- Vite
- HTML & CSS
- Browser localStorage
- html-to-image
- Supabase (PostgreSQL database)
- Git & GitHub
- Vercel (hosting and deployment)

## 🔗 How Sharing Works

Sharing evolved across two versions:

**V1 — client-side only.** When the user selected **Share Poem**, the poem title and content were compressed and encoded directly into the generated URL. Opening the link read the compressed data from the URL and reconstructed the poem in a read-only view. This worked without any backend, but URLs grew very long for longer poems.

**V2 — Supabase-backed.** Poems are now stored in a Supabase (PostgreSQL) database and retrieved via a short, clean share link. This keeps URLs readable regardless of poem length and lays the groundwork for persistent, manageable shared poems.

## 🖼️ Download as Image

Recipients can download a shared poem as a PNG image.

The application uses `html-to-image` to convert the rendered poem card into a downloadable image directly in the browser — no server-side rendering required.

## 💾 Local Saving

While writing, the poem title and content are automatically stored using browser `localStorage`.

This means unfinished work survives a page refresh without hitting the database on every keystroke. The user can remove the locally stored poem with **Clear Poem**.

## 🚀 Running the Project Locally

Clone the repository:

```bash
git clone https://github.com/Sinoinaite/poetic-verse.git
