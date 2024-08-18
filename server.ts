import type { RequestHandler, AppLoadContext } from "@remix-run/cloudflare";
import { Hono } from "hono";
import { poweredBy } from "hono/powered-by";
import { staticAssets } from "remix-hono/cloudflare";
import { remix } from "remix-hono/handler";

const app = new Hono();

let handler: RequestHandler | undefined;
app.use(poweredBy());

app.get("/api/hello", (c) => {
  return c.json({ message: "🔥" });
});
app.use(
  async (c, next) => {
    if (process.env.NODE_ENV !== "development" || import.meta.env.PROD) {
      return staticAssets()(c, next);
    }
    await next();
  },
  async (c, next) => {
    if (process.env.NODE_ENV !== "development" || import.meta.env.PROD) {
      const serverBuild = await import("./build/server");
      return remix({
        build: serverBuild,
        mode: "production",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        getLoadContext(c) {
          return {
            cloudflare: {
              env: c.env,
            },
          };
        },
      })(c, next);
    } else {
      if (!handler) {
        // @ts-expect-error it's not typed
        // eslint-disable-next-line import/no-unresolved
        const build = await import("virtual:remix/server-build");
        const { createRequestHandler } = await import("@remix-run/cloudflare");
        handler = createRequestHandler(build, "development");
      }
      const remixContext = {
        cloudflare: {
          env: c.env,
        },
      } as unknown as AppLoadContext;
      return handler(c.req.raw, remixContext);
    }
  }
);

export default app;
