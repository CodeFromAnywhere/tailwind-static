# tailwind-static
Use Tailwind with zero setup for static HTML

The idea is simple: use `<script src="https://cdn.tailwindstatic.com" />` in your html, and when the HTML is loaded in the browser, the script will look up the origin to determine which classes are needed. It will respond with all of tailwind if it can't reach the origin (e.g. if it was localhost or file://) or it will extract the specific classes it needs and compile a static CSS file for your HTML page.
