import type { MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData, json } from "@remix-run/react";
import { getTodos } from "~/api";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    {
      name: "description",
      content: "Welcome to Remix on Cloudflare!",
    },
  ];
};

export const loader = async () => {
  const data = await getTodos();
  return json({ data });
};

export default function Index() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <div className="font-sans p-4">
      <h1 className="text-3xl">Welcome to Remix on Cloudflare</h1>
      <ul>
        {data && data.map((todo) => <li key={todo.id}>{todo.content}</li>)}
      </ul>
    </div>
  );
}
