import React, {useEffect, useState} from 'react';
import PhoneBookList, {PhoneBookUser} from './PhoneBookList';
import {getList} from '../../api';

export default function PhoneBook() {
  const [list, setlist] = useState<PhoneBookUser[] | undefined>();
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const getListPhoneBook = () => {
      setisLoading(true);
      getList()
        .then(response => {
          setlist(response?.data);
        })
        .catch(() => {})
        .finally(() => {
          setisLoading(false);
        });
    };

    getListPhoneBook();
  }, []);

  return <PhoneBookList isLoading={isLoading} data={list} />;
}
