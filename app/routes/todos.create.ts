import type { ActionFunctionArgs } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/react";
import { createTodo } from "~/api";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const newTodo = Object.fromEntries(formData);

  await createTodo(newTodo);

  return redirect("/todos");
};
