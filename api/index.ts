import postcss from "postcss";
import tailwindcss from "tailwindcss";

export async function generateTailwindCSS(
  html: string,
  origin: string | null,
): Promise<string> {
  const config = {
    content: [
      {
        raw: html,
        extension: "html",
      },
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  };

  // If no origin or localhost, return full Tailwind CSS
  if (!origin || origin.includes("localhost") || origin.startsWith("file://")) {
    config.content = [{ raw: "*", extension: "html" }];
  }

  const css = `@tailwind base;
               @tailwind components;
               @tailwind utilities;`;

  const tailwindPlugin = tailwindcss(config);

  console.log({ css, tailwindPlugin });

  const result = await postcss([tailwindPlugin]).process(css, {
    from: undefined,
  });
  console.log({ result });
  return result.css;
}

export default async function handler(req: Request) {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  try {
    const origin = Object.fromEntries(
      Object.entries(req.headers).map(([key, value]) => [
        key.toLowerCase(),
        value,
      ]),
    )["origin"];
    let html = "";
    console.log({ origin });
    if (origin) {
      // Fetch HTML from origin
      try {
        const response = await fetch(origin);
        html = await response.text();
        console.log("HTML!!!", html.length);
      } catch (error) {
        console.error("Error fetching HTML:", error);
      }
    }

    const css = await generateTailwindCSS(html, origin);

    return new Response(css, {
      headers: {
        "Content-Type": "text/css",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
