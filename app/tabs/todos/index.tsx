import React, {useEffect, useState} from 'react';
import {FlatList, Pressable, Text} from 'react-native';
import {ITodoItem, getTodos, trackTodo} from './service';

export default function TodoList() {
  const [todos, settodos] = useState<ITodoItem[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const items = await getTodos();
      if (items) {
        settodos([items]);
      }
    };

    fetchTodos();
  }, []);

  return (
    <FlatList
      data={todos}
      renderItem={({item, index}) => (
        <Pressable
          onPress={() => {
            trackTodo(item);
          }}>
          <Text key={index}>{item.title}</Text>
        </Pressable>
      )}
    />
  );
}
