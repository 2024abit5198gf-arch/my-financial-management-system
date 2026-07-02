# Vercel environment variables

Set these in the Vercel Project Settings -> Environment Variables section:

- VITE_API_BASE_URL=/api
- JWT_SECRET=your-strong-random-secret

## How to use them

- VITE_API_BASE_URL tells the frontend where to send API requests. Use /api for this project so the frontend talks to the Vercel API route.
- JWT_SECRET is used to sign login tokens. It must be a long random string.

## Example

If you use the Vercel dashboard, add them for Production, Preview, and Development.
