# tailwind-static

Use Tailwind with zero setup for static HTML

The idea is simple: use `<script src="https://cdn.tailwindstatic.com" />` in your html, and when the HTML is loaded in the browser, the script will look up the origin to determine which classes are needed. It will respond with all of tailwind if it can't reach the origin (e.g. if it was localhost or file://) or it will extract the specific classes it needs and compile a static CSS file for your HTML page.

# Insight

After having done this I'm only seeing that https://cdn.tailwindcss.com is actuallly a JS file. LOL! Missed that. That means likely that it is reading the entire website on-demand i guess already, so the advantage to doing it on the backend and then serve a CSS is minimal. The only advantage would be that it maybe faster on subsequent requests (if it's cached via CDN)

The problem now I'm running into is that the 'referer' header is actually only the origin part of the URL but we need the entire URL of the static html file!
