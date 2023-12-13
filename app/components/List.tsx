import React, {useState} from 'react';
import {Text, TextInput, View} from 'react-native';

interface IList {
  data?: Array<{name: string}>;
}

const List = ({data}: IList) => {
  const [name, setname] = useState('');

  return (
    <View>
      <TextInput
        placeholder="Search Name"
        value={name}
        onChangeText={setname}
      />
      {(!data || data?.length === 0) && <Text>No Data</Text>}
    </View>
  );
};

export default List;
