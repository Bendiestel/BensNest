# ✨ Ben's Nest ✨

Welcome to my personal digital garden. This project is a retro-styled React application powered by Vite.

## 🚀 Getting Started

1.  install dependencies:
    ```bash
    npm install
    ```
2.  Start the development server:
    ```bash
    npm run dev
    ```
3.  Open your browser to the local URL (usually `http://localhost:5173`).

---

## 📝 How to Manage Content

### 1. Adding New Blog Posts

All blog posts are stored as **Markdown files** in the `src/posts` folder.

**Steps to add a post:**

1.  Create a new file in `src/posts/` (e.g., `my-awesome-post.md`).
2.  Add the required metadata block (frontmatter) at the very top of the file:

    ```markdown
    ---
    title: My Awesome Post Title
    date: 2026-01-29
    image: https://path-to-your-image.com/image.jpg
    ---
    ```
    *(Note: `image` is optional)*

3.  Write your content below the dashes using Markdown. You can use:
    *   `# Headers`
    *   `**Bold text**`
    *   `*Italic text*`
    *   `[Links](http://google.com)`
    *   Lists, images, etc.

The new post will automatically appear on the timeline!

### 2. Updating Sidebar Quips

The "Quips" section in the sidebar reads from a JSON data file.

**Steps to add a quip:**

1.  Open `src/data/quips.json`.
2.  Add a new object to the list:

    ```json
    {
      "id": 5,
      "text": "This is my new funny quip."
    }
    ```

3.  Make sure to:
    *   Give it a unique `id` number.
    *   Add a comma `,` after the previous item if you are adding it to the end (but not after the last item's closing brace `}`).

---

## 🎨 Customization

*   **Avatar**: Replace `src/assets/avatar.png` to change your profile picture.
*   **Styles**: Global styles are in `index.css` and `App.css`. Component styles are in their respective folders.

Enjoy your nest! 🥚
