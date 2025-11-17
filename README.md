# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/b66a73b2-5867-47f9-ac1f-66b2cb014a04

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/b66a73b2-5867-47f9-ac1f-66b2cb014a04) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/b66a73b2-5867-47f9-ac1f-66b2cb014a04) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## Edge Functions for external reviews

This project uses Supabase Edge Functions to fetch posts and reviews from external platforms. Each function is designed to be deployed independently via the Supabase Dashboard.

### Available Functions

**Social Media Platforms:**
- `fetch-facebook-post` - Facebook posts
- `fetch-x-post` - X (Twitter) posts
- `fetch-linkedin-post` - LinkedIn posts
- `fetch-tiktok-post` - TikTok posts
- `fetch-instagram-post` - Instagram posts
- `fetch-youtube-post` - YouTube videos
- `fetch-threads-post` - Threads posts

**Review Platforms:**
- `fetch-google-review` - Google Reviews
- `fetch-yelp-review` - Yelp reviews
- `fetch-g2-review` - G2 reviews
- `fetch-appsumo-review` - AppSumo reviews
- `fetch-amazon-review` - Amazon reviews
- `fetch-capterra-review` - Capterra reviews
- `fetch-producthunt-review` - Product Hunt reviews

### Manual Deployment via Supabase Dashboard

To deploy these functions without using the CLI:

1. **Go to the Supabase Dashboard**
   - Navigate to https://supabase.com/dashboard
   - Select your project (Project ID: `cttirpxnbtkjqfmhyswp`)

2. **Open Edge Functions**
   - Click on "Edge Functions" in the left sidebar

3. **Create a new function**
   - Click "New Function"
   - Use the exact folder name as the function name (e.g., `fetch-facebook-post`)

4. **Paste the code**
   - Open the corresponding file from `supabase/functions/<function-name>/index.ts`
   - Copy all the contents
   - Paste into the Supabase online editor

5. **Important: Deploy the shared CORS helper first**
   - Create a function named `_shared`
   - Paste the contents of `supabase/functions/_shared/cors.ts`
   - Save and deploy this before deploying any other functions

6. **Save and Deploy**
   - Click "Save" then "Deploy"
   - Wait for the deployment to complete

7. **Test the function**
   - Each function URL will be:
     ```
     https://cttirpxnbtkjqfmhyswp.supabase.co/functions/v1/<function-name>
     ```
   - Example:
     ```
     https://cttirpxnbtkjqfmhyswp.supabase.co/functions/v1/fetch-facebook-post
     ```

### Testing from the browser

You can test any function using the Supabase client:

```javascript
const { data, error } = await supabase.functions.invoke('fetch-facebook-post', {
  body: { url: 'https://facebook.com/post/123', extra: {} }
})
```

All functions currently return debug stubs. The real fetch and parsing logic needs to be implemented for each platform.
