import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData, json } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    {
      name: "description",
      content: "Welcome to Remix on Cloudflare!",
    },
  ];
};

export const loader = async ({ context }: LoaderFunctionArgs) => {
  const host = context.cloudflare.env.API_HOST;

  const response = await fetch(`${host}/api/hello`);
  const data = (await response.json()) as { message: string };
  return json({ data });
};

export default function Index() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <div className="font-sans p-4">
      <h1 className="text-3xl">Welcome to Remix on Cloudflare</h1>
      {data ? <p>{data.message}</p> : <p>loading...</p>}
    </div>
  );
}
