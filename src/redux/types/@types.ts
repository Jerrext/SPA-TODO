export type PayloadWithCallback<Data> = {
  data: Data;
  callback?: () => void;
};

export type PayloadWithId<Data> = {
  id: number;
  data: Data;
};
