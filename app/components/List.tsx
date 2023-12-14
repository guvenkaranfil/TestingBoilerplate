import React, {useState} from 'react';
import {ActivityIndicator, FlatList, Text, TextInput, View} from 'react-native';

interface IList {
  isLoading?: boolean;
  data?: Array<{name: string}>;
}

const List = ({isLoading, data}: IList) => {
  const [name, setname] = useState('');

  return (
    <View>
      <TextInput
        placeholder="Search Name"
        value={name}
        onChangeText={setname}
      />
      {isLoading && <ActivityIndicator testID="loader" size="small" />}
      {(!data || data?.length === 0) && <Text>No Data</Text>}

      {!isLoading && data && data?.length > 0 && (
        <FlatList
          data={data}
          renderItem={({item}) => <Text>{item.name}</Text>}
        />
      )}
    </View>
  );
};

export default List;
