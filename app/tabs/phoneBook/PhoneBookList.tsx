import React, {useState} from 'react';
import {Text, TextInput, View} from 'react-native';

interface PhoneBookUser {
  name: string;
  phoneNumber: string;
}
interface IPhoneBookList {
  data?: Array<PhoneBookUser>;
}

const PhoneBookList = ({data}: IPhoneBookList) => {
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

export default PhoneBookList;
