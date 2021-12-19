type Schema = {
  [key: string]: {
    type: unknown;
    required?: boolean;
    minlen?: number;
    maxlen?: number;
    min?: number;
    max?: number;
  };
};

export default Schema;
