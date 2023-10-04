import { OptionType } from './@globalTypes';

export const setFieldRequiredErrorText = (
  touched: boolean,
  fieldValue: string,
  setFieldValue: (value: string) => void,
) => {
  if (touched) {
    if (fieldValue.length === 0) {
      setFieldValue('Это обязательное поле');
    } else {
      setFieldValue('');
    }
  }
};

export const getCurrentDate = () => {
  const now = new Date();
  const newDate = new Intl.DateTimeFormat();
  return newDate.format(now);
};

export const getNewStatusOptions = (item: OptionType, isTrue: boolean) => {
  return isTrue ? { ...item, isDisabled: true } : item;
};
