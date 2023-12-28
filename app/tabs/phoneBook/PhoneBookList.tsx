import React, {useEffect, useState} from 'react';
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
  isLoading?: boolean;
  isFetching?: boolean;
  data?: Array<PhoneBookUser>;
  onRefresh?: () => void;
  onEndReached?: () => void;
}

const PhoneBookList = ({
  isLoading = false,
  isFetching = false,
  data,
  onRefresh,
  onEndReached,
}: IPhoneBookList) => {
  const [name, setname] = useState('');
  const [listData, setlistData] = useState(data);

  useEffect(() => {
    setlistData(data);
  }, [data]);

  const _onChangeText = (text: string) => {
    setname(text);
    const filteredData = data?.filter(item => item.name.includes(text));
    setlistData(filteredData);
  };

  return (
    <View>
      <TextInput
        placeholder="Search Name"
        value={name}
        onChangeText={_onChangeText}
      />
      {isLoading && <ActivityIndicator testID="loader" />}
      {(!data || data?.length === 0) && !isLoading && <Text>No Data</Text>}
      {!isLoading && (
        <FlatList
          testID="list"
          refreshControl={
            <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
          }
          data={listData}
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
