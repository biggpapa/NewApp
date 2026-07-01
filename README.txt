EMBRACE BHARAT FOUNDATION — ANDROID APP (PWA)
================================================

WHAT THIS IS
This is a Progressive Web App (PWA): a website built to install and behave
like a real Android app — home screen icon, full-screen (no browser bar),
and works offline for pages already visited. This is a genuine, widely-used
way to ship "an app" without native development.

FILES
  index.html               The app itself
  manifest.webmanifest     Tells Android how to install it (name, icon, colors)
  service-worker.js        Enables offline use + installability
  icons/                   App icons (192, 512, maskable, apple-touch, favicon)

BEFORE YOU PUBLISH
1. Replace the placeholder "EB" monogram icons in /icons with your real logo
   if you'd like — regenerate at 192x192, 512x512, and a 512x512 "maskable"
   version (icon content kept within the center ~80% safe zone).
2. Open index.html and find FOUNDATION_WHATSAPP near the top of the <script>
   section — replace "91XXXXXXXXXX" with your real WhatsApp Business number
   (country code, no + or spaces).
3. Search for PRODUCTS in the same script to edit award/medal/kit prices.
4. Keep your original image files (Logo_Transparent.png, "Equipping the
   Youth.jpg", etc.) in the same folder as index.html, same as before.

HOW TO MAKE IT INSTALLABLE ON ANDROID
A service worker and manifest only activate installability once the site is
served over HTTPS (not opened directly as a local file). Steps:
  1. Upload this whole folder to any static host — GitHub Pages, Netlify,
     Vercel, Firebase Hosting, or your own web host all work and are free
     for a site like this.
  2. Open the live HTTPS link in Chrome on an Android phone.
  3. Chrome will show an "Install app" prompt automatically (or use the
     "Install App" button that appears on the page, or Chrome's menu →
     "Add to Home screen").
  4. It now opens from the home screen like any other app.

IF YOU WANT AN ACTUAL .APK / PLAY STORE LISTING
A PWA is not a downloadable .apk file by itself, and building a real .apk
requires the Android SDK and Google's build tools, which aren't available
in this sandboxed environment (no internet access to Google's servers here).
The practical no-code path once this is hosted at a live URL:
  - Go to https://www.pwabuilder.com, enter your live site URL, and it will
    package this PWA into a signed Android App Bundle (.aab) / APK ready to
    upload to the Google Play Console. This is a legitimate, widely used
    Microsoft-built tool for exactly this purpose.
  - If you'd rather have a fully native app (Kotlin/Java, deeper device
    integration), that's a separate custom development project.
