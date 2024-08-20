import { Todo } from "api/todos.model";
import { BASE_URL } from "../constants";

export async function getTodos(): Promise<Todo[]> {
  const response = await fetch(`${BASE_URL}/api/todos`);
  const data = (await response.json()) as Todo[];

  return data;
}
