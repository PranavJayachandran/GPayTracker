import { IPayment } from "./IPayment";

export interface IGroupExpense {
    creation_time: string;
    creator: string;
    group_name: string;
    items: IPayment[];
    state: string;
    title: string;
    total_amount: string;
  }