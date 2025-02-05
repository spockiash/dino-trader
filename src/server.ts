import { Application, Router, send } from "oak";

const app = new Application();
const router = new Router();

// Route to serve index.html
router.get("/", async (ctx) => {
  await send(ctx, "index.html", {
    root: Deno.cwd(),
  });
});

// Serve static files (JS, CSS, images, etc.)
app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (ctx) => {
  await send(ctx, ctx.request.url.pathname, {
    root: Deno.cwd(),
    index: "index.html",
  });
});

// Start the server on port 8000
console.log("Server running on http://localhost:8000");
await app.listen({ port: 8000 });
