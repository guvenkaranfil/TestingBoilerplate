import store from '../../store';

export const createHabit = () => {
  const inputs = store.getState().inputs;
  const name = inputs.name;
  console.log('*createHabit*, ', name);
};
