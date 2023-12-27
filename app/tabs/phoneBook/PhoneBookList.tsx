import React, {useState} from 'react';
import {ActivityIndicator, Text, TextInput, View} from 'react-native';

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
    </View>
  );
};

export default PhoneBookList;
