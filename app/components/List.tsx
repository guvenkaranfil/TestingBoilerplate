import React, {useState} from 'react';
import {TextInput} from 'react-native';

const List = () => {
  const [name, setname] = useState('');

  return (
    <TextInput placeholder="Search Name" value={name} onChangeText={setname} />
  );
};

export default List;
