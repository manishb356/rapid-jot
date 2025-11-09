# RapidJot

A simple, fast online note-taking app with markdown support. Similar to dontpad, RapidJot allows you to create and edit notes without authentication. Each note has a unique URL, and anyone with the URL can view and edit the note.

## Features

-   No authentication required
-   Markdown support with live preview
-   Auto-saving
-   Clean and modern UI
-   Responsive design

## Tech Stack

-   Next.js 14
-   TypeScript
-   Tailwind CSS
-   Supabase (for data storage)
-   React Markdown Editor

## Getting Started

1. Clone the repository
2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up Supabase:

    - Create a new project at [Supabase](https://supabase.com)
    - Create a new table called `notes` with the following schema:
        ```sql
        create table notes (
          id text primary key,
          content text,
          updated_at timestamp with time zone default timezone('utc'::text, now()) not null
        );
        ```
    - Get your project URL and anon key from the project settings

4. Create a `.env.local` file in the root directory with the following variables:

    ```
    SUPABASE_URL=your-project-url
    SUPABASE_ANON_KEY=your-anon-key
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-public-recaptcha-site-key
    RECAPTCHA_SECRET_KEY=your-recaptcha-secret-key
    ```

5. Run the development server:

    ```bash
    npm run dev
    ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## How to Use

1. Visit the homepage to get redirected to a new note with a random ID
2. Share the URL with others to collaborate on the note
3. The note will auto-save after 2 seconds of inactivity
4. Use markdown syntax in the editor to format your text

## License

MIT
