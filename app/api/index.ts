import {PhoneBookUser} from '../tabs/phoneBook/PhoneBookList';

export const getList = (): Promise<
  {data: Array<PhoneBookUser>} | undefined
> => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:8080/list')
      .then(res => {
        return res.json();
      })
      .then(data => resolve({data: data.data}))
      .catch(reject);
  });
};
