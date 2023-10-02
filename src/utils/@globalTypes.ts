export enum ButtonType {
  PRIMARY,
  SECONDARY,
  SMALL,
}

export enum ModalWindowType {
  CreateProject,
  EditProject,
  CreateTask,
}

export enum InputType {
  TEXT = 'text',
  EMAIL = 'email',
  TELEPHONE = 'tel',
  PASSWORD = 'password',
  TEXTAREA = 'textarea',
}

export type OptionType = {
  value: string;
  label: string;
  color?: string;
};

export type OptionsListType = OptionType[];
