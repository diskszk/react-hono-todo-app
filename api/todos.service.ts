import { CreateTodoMutation, Todo } from "./todos.model";

type RawTodo = {
  todoId: string;
  title: string;
  done: "TRUE" | "FALSE";
  due: string;
  created_at: string;
};

export class TodosService {
  constructor(readonly db: D1Database) {}

  async getTodos(): Promise<Todo[]> {
    const sqlResponse = await this.db
      .prepare("SELECT * FROM todos")
      .all<RawTodo>();

    const todos = sqlResponse.results.map((r) => ({
      ...r,
      done: r.done === "TRUE" ? true : false,
    }));

    return todos;
  }

  async createTodo(params: CreateTodoMutation): Promise<void> {
    await this.db
      .prepare(
        `INSERT INTO todos (title, due) VALUES ('${params.title}', '${params.due}')`
      )
      .all();
  }

  async getTodoById(todoId: string): Promise<Todo> {
    const sqlResponse = await this.db
      .prepare(`SELECT * FROM todos WHERE todoId = ${todoId}`)
      .run<RawTodo>();

    if (sqlResponse.error) {
      console.error("sql error!!: ", sqlResponse.error);
    }

    if (!sqlResponse.results.length) {
      throw new Error("404 not found todo");
    }

    const todo = {
      ...sqlResponse.results[0],
      done: sqlResponse.results[0].done === "TRUE" ? true : false,
    };

    return todo;
  }

  async deleteTodo(todoId: string) {
    await this.db.prepare(`DELETE FROM todos WHERE todoId = ${todoId}`).run();
  }
}
