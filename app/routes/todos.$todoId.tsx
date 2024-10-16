import { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { Form, json, useLoaderData } from "@remix-run/react";
import { getTodoById } from "~/api";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const id = params.todoId;

  if (!id) {
    throw new Error("404 id not found");
  }

  const data = await getTodoById(id);
  return json({ data });
};

export default function Todo() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <div className="flex">
      {data && (
        <>
          <Form method="put" action="update">
            <input type="text" name="title" value={data.title} />
            <input type="date" name="due" value={data.due} />
            <button type="submit">更新する</button>
          </Form>
          <Form method="post" action="delete">
            <button type="submit">削除する</button>
          </Form>
        </>
      )}
    </div>
  );
}
