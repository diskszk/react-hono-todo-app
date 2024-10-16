import { Todo } from "api/todos.model";
import { BASE_URL } from "../constants";

export async function getTodos(): Promise<Todo[]> {
  const response = await fetch(`${BASE_URL}/api/todos`);
  const data = (await response.json()) as Todo[];

  return data;
}

export async function getTodoById(todoId: string): Promise<Todo> {
  const response = await fetch(`${BASE_URL}/api/todos/${todoId}`);

  const data = (await response.json()) as Todo;

  return data;
}

export async function createTodo({
  title,
  due,
}: {
  title?: string;
  due?: string;
}) {
  const response = await fetch(`${BASE_URL}/api/todos`, {
    method: "POST",
    body: JSON.stringify({ title, due }),
  });

  return response.status;
}

export async function deleteTodo(todoId: string) {
  const response = await fetch(`${BASE_URL}/api/todos/${todoId}`, {
    method: "DELETE",
  });

  return response.status;
}
