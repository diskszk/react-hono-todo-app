import { Todo } from "./todos.model";

export async function getTodos(): Promise<Todo[]> {
  const todos: Todo[] = [
    {
      id: "asdf",
      content: "トイレットペーパーを買う",
      done: false,
    },
    {
      id: "qwer",
      content: "映画のチケットを買う",
      done: false,
    },
  ];

  return todos;
}
