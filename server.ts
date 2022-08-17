import { Application } from "./deps.ts";
import { router } from "./src/routes/index.ts";

const app = new Application();
app.use(router.routes());

app.use((ctx) => {
    ctx.response.body = `Hola Mundo!`;
});

console.log("Server running on http://localhost:8080");

await app.listen({ port: 8080 });
