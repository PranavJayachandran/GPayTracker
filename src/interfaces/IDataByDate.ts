export interface IDataByDate {
  spent: {
    [key: string]: /*year*/ {
      [key: string]: /*month*/ {
        [key: string]: /*week*/ {
          [key: string]: number;
        };
      };
    };
  };
  recieved: {
    [key: string]: /*year*/ {
      [key: string]: /*month*/ {
        [key: string]: /*week*/ {
          [key: string]: number;
        };
      };
    };
  };
}
