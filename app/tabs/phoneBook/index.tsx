import React from 'react';
import PhoneBookList from './PhoneBookList';

export default function PhoneBook() {
  return <PhoneBookList isLoading={false} data={DATA} />;
}

const DATA = [
  {name: 'User 1', phoneNumber: '123-456-7800'},
  {name: 'User 2', phoneNumber: '123-456-7801'},
  {name: 'User 3', phoneNumber: '123-456-7802'},
  {name: 'User 4', phoneNumber: '123-456-7803'},
  {name: 'User 5', phoneNumber: '123-456-7804'},
  {name: 'User 6', phoneNumber: '123-456-7805'},
  {name: 'User 7', phoneNumber: '123-456-7806'},
  {name: 'User 8', phoneNumber: '123-456-7807'},
  {name: 'User 9', phoneNumber: '123-456-7808'},
  {name: 'User 10', phoneNumber: '123-456-7809'},
  {name: 'User 11', phoneNumber: '123-456-7810'},
  {name: 'User 12', phoneNumber: '123-456-7811'},
  {name: 'User 13', phoneNumber: '123-456-7812'},
  {name: 'User 14', phoneNumber: '123-456-7813'},
  {name: 'User 15', phoneNumber: '123-456-7814'},
  {name: 'User 16', phoneNumber: '123-456-7815'},
  {name: 'User 17', phoneNumber: '123-456-7816'},
  {name: 'User 18', phoneNumber: '123-456-7817'},
  {name: 'User 19', phoneNumber: '123-456-7818'},
  {name: 'User 20', phoneNumber: '123-456-7819'},
];
