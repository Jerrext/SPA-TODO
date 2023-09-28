import React, { ChangeEvent, FC, useState } from 'react';
import classNames from 'classnames';
import styles from './Input.module.scss';
import { InputType } from 'src/utils/@globalTypes';

type InputProps = {
  value: string;
  title: string;
  placeholder: string;
  type: InputType;
  disabled?: boolean;
  errText?: string;
  className?: string;
  onChange: (value: string) => void;
  onBlur?: (value: boolean) => void;
  required?: boolean;
};

const Input: FC<InputProps> = React.memo(
  ({
    value,
    title,
    placeholder,
    type,
    disabled,
    errText,
    className,
    onChange,
    onBlur,
    required,
  }) => {
    const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    };

    const onChangeTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value);
    };

    const onBlurInput = () => {
      onBlur && onBlur(true);
    };

    return (
      <div className={styles.wrapper}>
        {title && (
          <p
            className={classNames(styles.title, {
              [styles.required]: required,
            })}>
            {title}
          </p>
        )}
        <div className={styles.inputWrapper}>
          {type === 'textarea' ? (
            <textarea
              value={value}
              className={classNames(styles.input, className, styles.textarea, {
                [styles.activeInp]: value.length > 0,
                [styles.disabledInp]: disabled,
                [styles.errorInput]: errText,
              })}
              placeholder={placeholder}
              disabled={disabled}
              onBlur={onBlurInput}
              onChange={onChangeTextarea}></textarea>
          ) : (
            <input
              value={value}
              className={classNames(styles.input, className, {
                [styles.activeInp]: value.length > 0,
                [styles.disabledInp]: disabled,
                [styles.errorInput]: errText,
              })}
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              onChange={onChangeText}
              onBlur={onBlurInput}
            />
          )}
          {errText && <p className={styles.errorText}>{errText}</p>}
        </div>
      </div>
    );
  },
);

export default Input;
