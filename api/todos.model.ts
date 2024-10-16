export class Todo {
  constructor(
    readonly todoId: string,
    readonly title: string,
    readonly done: boolean,
    readonly due: string,
    readonly created_at: string
  ) {}
}

export type CreateTodoMutation = {
  title: string;
  due: string;
};
