import { ActionFunctionArgs, redirect } from "@remix-run/cloudflare";
import { deleteTodo } from "~/api";

export const action = async ({ params }: ActionFunctionArgs) => {
  if (!params.todoId) {
    throw new Error("no exists");
  }

  await deleteTodo(params.todoId);

  return redirect("/todos");
};
