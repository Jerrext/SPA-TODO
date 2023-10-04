import React, { FC, useEffect } from 'react';
import Select, { OnChangeValue } from 'react-select';
import './SelectComponent.scss';
import classNames from 'classnames';
import { OptionType, OptionsListType } from 'src/utils/@globalTypes';

type SelectComponentProps = {
  title?: string;
  placeholder: string;
  isDisabled?: boolean;
  optionsList?: OptionsListType | null;
  currentValue: string;
  setSelecValue: (value: any) => void;
  defaultValueId?: number;
  isSearchable?: boolean;
  isClearable?: boolean;
  errText?: string;
  onBlur?: (value: boolean) => void;
  isLoading?: boolean;
  required?: boolean;
};

const SelectComponent: FC<SelectComponentProps> = ({
  title,
  placeholder,
  isDisabled,
  optionsList,
  currentValue,
  setSelecValue,
  isSearchable,
  defaultValueId,
  isClearable,
  errText,
  isLoading,
  onBlur,
  required,
}) => {
  const onBlurSelect = () => {
    onBlur && onBlur(true);
  };

  const getValue = () => {
    return currentValue && optionsList
      ? optionsList.find((option) => option.value === currentValue)
      : null;
  };

  const onChange = (newValue: OnChangeValue<OptionType, boolean>) => {
    setSelecValue(newValue ? (newValue as OptionType).value : '');
  };

  useEffect(() => {
    defaultValueId !== undefined && optionsList && onChange(optionsList[defaultValueId]);
  }, [defaultValueId]);

  return (
    <div>
      {title && (
        <p
          className={classNames('customSelect__title', {
            ['customSelect__required']: required,
          })}>
          {title}
        </p>
      )}
      <div
        className={classNames('customSelect__wrapper', {
          'customSelect-disabled': isDisabled,
        })}>
        <Select
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              color: '#ffffff',
              border: errText
                ? '1px solid #e60000'
                : errText && state.isFocused
                ? '1px solid #e60000'
                : state.isFocused || currentValue.length > 0
                ? '1px solid #1f87ff'
                : '1px solid transparent',
              boxShadow:
                state.isFocused && errText
                  ? '0 0 20px -8px #e60000'
                  : state.isFocused
                  ? '0 0 20px -8px #1f87ff'
                  : '0',
              backgroundColor: state.isFocused ? '#2a2f38' : '#1e2229',
              transition: '0.3s',
            }),
            menu: (baseStyles, state) => ({
              ...baseStyles,
              border: errText ? '1px solid #e60000' : '1px solid #1f87ff',
              borderTop: '0',
            }),
            option: (baseStyles, { data, isDisabled }) => ({
              ...baseStyles,
              color: isDisabled ? '#7d8590' : data.color ? data.color : '#ffffff',
              backgroundColor: isDisabled ? '#1e2229' : '#2a2f38',
              cursor: isDisabled ? 'not-allowed' : 'pointer',
            }),
            noOptionsMessage: (baseStyles, state) => ({
              ...baseStyles,
              padding: '10px 20px',
              color: '#ffffff',
            }),
            singleValue: (styles, { data }) => ({
              ...styles,
              color: data.color,
            }),
          }}
          onChange={onChange}
          value={getValue()}
          className="customSelect"
          classNamePrefix="customSelect"
          isClearable={isClearable}
          isSearchable={isSearchable}
          options={optionsList !== null ? optionsList : undefined}
          placeholder={placeholder}
          isDisabled={isDisabled}
          unstyled
          noOptionsMessage={() => 'Нет вариантов'}
          isLoading={isLoading}
          onBlur={onBlurSelect}
        />
        {errText && <p className="customSelect__errText">{errText}</p>}
      </div>
    </div>
  );
};

export default SelectComponent;
