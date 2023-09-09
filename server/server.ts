import { Application } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import router from "./routes.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

const app = new Application();
const PORT = 8000;

app.use(router.routes());
app.use(router.allowedMethods());
app.use(
  oakCors({
    origin: "http://localhost:3000",
  })
); // Enable CORS for All Routes

// event listener
app.addEventListener("listen", () => {
  console.log(`Deno 🦖 is sailing with her deni 🦕 at PORT:${PORT}`);
});

await app.listen({ port: PORT });
