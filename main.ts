import { Application, Router } from "./deps.ts";
import { createPackagesTable } from "./src/database/models/package.ts";
import packageRouter from "./src/routes/packages.ts";
import { oakCors } from "./deps.ts";
import { join } from "https://deno.land/std/path/mod.ts";
import "https://deno.land/std@0.204.0/dotenv/load.ts";

const app = new Application();
const port = 8000;

app.use(oakCors());

// Middleware global de error
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    ctx.response.status = 500;
    ctx.response.body = { error: error.message };
  }
});

// Servir HTML y archivos estáticos
app.use(async (ctx, next) => {
  try {
    await ctx.send({
      root: join(Deno.cwd(), "src", "views"),
      index: "index.html",
    });
  } catch {
    await next();
  }
});

// API REST
app.use(packageRouter.routes());
app.use(packageRouter.allowedMethods());

// Ruta raíz
const router = new Router();
router.get("/", (ctx) => {
  ctx.response.body = "API de Gestión de Paquetes P5 - Deno";
});
app.use(router.routes());

// Crear tabla si no existe
await createPackagesTable();

console.log(`Servidor web corriendo en http://localhost:${port}`);
await app.listen({ port });
