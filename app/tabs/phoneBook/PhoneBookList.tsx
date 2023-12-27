import React, {useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TextInput,
  View,
} from 'react-native';

export interface PhoneBookUser {
  name: string;
  phoneNumber: string;
}
interface IPhoneBookList {
  isLoading: boolean;
  isFetching?: boolean;
  data?: Array<PhoneBookUser>;
  onRefresh?: () => void;
  onEndReached?: () => void;
}

const PhoneBookList = ({
  isLoading,
  isFetching = false,
  data,
  onRefresh,
  onEndReached,
}: IPhoneBookList) => {
  const [name, setname] = useState('');

  return (
    <View>
      <TextInput
        placeholder="Search Name"
        value={name}
        onChangeText={setname}
      />
      {isLoading && <ActivityIndicator testID="loader" />}
      {(!data || data?.length === 0) && !isLoading && <Text>No Data</Text>}
      {!isLoading && (
        <FlatList
          testID="list"
          refreshControl={
            <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
          }
          data={data}
          renderItem={({item}) => (
            <View>
              <Text>{item.name}</Text>
              <Text>{item.phoneNumber}</Text>
            </View>
          )}
          onEndReached={onEndReached}
          ListFooterComponent={
            isFetching ? <ActivityIndicator testID="loadMore" /> : null
          }
        />
      )}
    </View>
  );
};

export default PhoneBookList;
