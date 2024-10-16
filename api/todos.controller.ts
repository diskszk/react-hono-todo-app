import { Hono } from "hono";
import { TodosService } from "./todos.service";
import { CreateTodoMutation } from "./todos.model";

type Bindings = {
  DB: D1Database;
};

const todos = new Hono<{ Bindings: Bindings }>();

todos.get("/", async (c) => {
  const todosService = new TodosService(c.env.DB);
  const allTodos = await todosService.getTodos();
  return c.json(allTodos);
});

todos.post("/", async (c) => {
  const param = await c.req.json<CreateTodoMutation>();
  const todosService = new TodosService(c.env.DB);

  await todosService.createTodo(param);
  return c.status(201);
});

todos.get("/:todoId", async (c) => {
  const todosService = new TodosService(c.env.DB);
  const todo = await todosService.getTodoById(c.req.param("todoId"));

  return c.json(todo);
});

export { todos };

todos.delete("/:todoId", async (c) => {
  const todosService = new TodosService(c.env.DB);

  await todosService.deleteTodo(c.req.param("todoId"));

  return c.status(200);
});
