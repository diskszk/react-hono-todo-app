import { Hono } from "hono";
import { getTodos } from "./todos.service";

const todos = new Hono();

todos.get("/", async (c) => {
  const allTodos = await getTodos();
  return c.json(allTodos);
});

export { todos };
