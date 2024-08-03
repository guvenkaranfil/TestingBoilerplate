export interface ITodoItem {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export const getTodos = async (): Promise<ITodoItem | undefined> => {
  return new Promise((resolve, reject) => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => resolve(json))
      .catch(error => reject(error));
  });
};

export const trackTodo = (todo: ITodoItem) => {
  console.log('Tracking todo:', todo);

  return true;
};
