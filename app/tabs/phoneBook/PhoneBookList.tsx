import React, {useState} from 'react';
import {ActivityIndicator, FlatList, Text, TextInput, View} from 'react-native';

interface PhoneBookUser {
  name: string;
  phoneNumber: string;
}
interface IPhoneBookList {
  isLoading: boolean;
  data?: Array<PhoneBookUser>;
}

const PhoneBookList = ({isLoading, data}: IPhoneBookList) => {
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
          data={data}
          renderItem={({item}) => (
            <View>
              <Text>{item.name}</Text>
              <Text>{item.phoneNumber}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default PhoneBookList;
