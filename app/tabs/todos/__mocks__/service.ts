// Mocked todo item response
const mockedTodoItem = {userId: 1, id: 1, title: 'Test Todo', completed: false};

export const getTodos = jest.fn(() => Promise.resolve(mockedTodoItem));

export const trackTodo = jest.fn();
