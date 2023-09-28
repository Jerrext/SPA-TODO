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
