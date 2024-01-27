export interface IMoneyByDate {
  [key: string]: /*year*/ {
    [key: string]: /*month*/ {
      [key: string]: /*week*/ {
        [key: string]: number;
      };
    };
  };
}
