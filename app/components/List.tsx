import React, {useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TextInput,
  View,
} from 'react-native';

interface IList {
  isLoading?: boolean;
  isFetching?: boolean;
  data?: Array<{name: string}>;

  onRefresh?: () => void;
  onEndReached?: () => void;
}

const List = ({
  isLoading,
  isFetching = false,
  data,
  onRefresh,
  onEndReached,
}: IList) => {
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
          testID="list"
          refreshControl={
            <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
          }
          data={data}
          renderItem={({item}) => <Text>{item.name}</Text>}
          onEndReached={onEndReached}
          ListFooterComponent={
            isFetching ? <ActivityIndicator testID="loadMore" /> : null
          }
        />
      )}
    </View>
  );
};

export default List;
