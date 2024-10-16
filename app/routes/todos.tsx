import { useLoaderData, json, Link, Outlet, Form } from "@remix-run/react";
import { getTodos } from "~/api";

export const loader = async () => {
  const data = await getTodos();
  return json({ data });
};

const getDueDate = (due: string): string => {
  const date = due.split(" ")[0].replaceAll("-", "/");
  return date;
};

export default function TodoList() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <div>
      <div id="sidebar font-sans p-4">
        <h1 className="text-3xl">Welcome to Remix on Cloudflare</h1>
        <nav>
          {data.length && (
            <ul>
              {data.map((todo) => (
                <li key={todo.todoId} className="flex gap-2 py-1">
                  <p>{todo.title}</p>
                  <p>due: {getDueDate(todo.due)}</p>
                  <Link to={`/todos/${todo.todoId}`}>detail</Link>
                </li>
              ))}
            </ul>
          )}
        </nav>
      </div>

      <Form
        method="post"
        action="create"
        onSubmit={(event) => {
          const formData = new FormData(event.currentTarget);

          const title = formData.get("title");
          const due = formData.get("due");

          if (!title || !due) {
            event.preventDefault();
            alert("入力が不足しています");
            return;
          }
        }}
      >
        <input type="text" name="title" />
        <input type="date" name="due" />

        <button type="submit">Create</button>
      </Form>
      <div id="detail">
        <Outlet />
      </div>
    </div>
  );
}
