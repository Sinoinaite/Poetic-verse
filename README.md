# ✦ Poetic Verse

Poetic Verse is a simple web application for creating, previewing, sharing, and downloading poems.

The project was designed as a lightweight poetry-sharing experience with a vintage-inspired visual style. Users can write a poem without creating an account, temporarily save their work in their browser, and generate a shareable link that allows another person to view the finished poem.

##  Features

- Create poems with a title and body
- Live poem preview
- Automatic temporary saving using browser localStorage
- Poems remain available after refreshing the page
- Clear saved poems
- Generate compressed shareable poem links
- Open shared poems in a dedicated read-only view
- Download shared poems as PNG images
- Responsive design for desktop and mobile
- No login or account required
- No database required for V1

##  Design

Poetic Verse uses a vintage, romantic poetry-book aesthetic with a custom colour palette:

- Mauve `#9F7E99`
- Deep Blue-Grey `#3B424B`
- Warm Cream `#F3EFE9`
- Antique Gold `#D3A537`
- Soft Lavender `#D1BCD6`

##  Technologies

- React
- JavaScript
- Vite
- HTML & CSS
- Browser localStorage
- LZ-String
- html-to-image
- Git & GitHub

##  How Sharing Works

Poetic Verse V1 does not require a backend or database.

When the user selects **Share Poem**, the poem title and content are compressed using LZ-String and encoded into the generated URL.

When another person opens the link, Poetic Verse reads the compressed data from the URL and reconstructs the poem in a read-only view.

This architecture allows poems to be shared without user accounts or server-side storage.

##  Download as Image

Recipients can download a shared poem as a PNG image.

The application uses `html-to-image` to convert the rendered poem card into a downloadable image directly in the browser.

##  Local Saving

While writing, the poem title and content are automatically stored using browser `localStorage`.

This means unfinished work can survive a page refresh without requiring a database.

The user can remove the locally stored poem using **Clear Poem**.

## 🚀 Running the Project Locally

Clone the repository:

```bash
git clone https://github.com/Sinoinaite/poetic-verse.git
```

Enter the project directory:

```bash
cd poetic-verse
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then open the local URL displayed by Vite.

##  Live Website

Deployment coming soon.

## Future Improvements

Planned improvements for future versions include:

- Supabase database integration
- Short poem-sharing URLs
- Persistent shared poems
- Additional poem card themes
- More download/customisation options

##  Creator

**Poetic Verse — crafted by Emba**

Built as a personal IT portfolio project to explore frontend development, browser storage, client-side data sharing, responsive UI design, Git/GitHub workflows, and web deployment.