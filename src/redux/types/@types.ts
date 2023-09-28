export type PayloadWithCallback<Data> = {
  data: Data;
  callback: () => void;
};
