export enum ButtonType {
  PRIMARY,
  SECONDARY,
  SMALL,
  DELETE,
}

export enum ModalWindowType {
  CreateProject,
  EditProject,
  CreateTask,
  TaskInfo,
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
  isDisabled?: boolean;
};

export type OptionsListType = OptionType[];
