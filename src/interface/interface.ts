
import moment, { Moment } from 'moment';
export interface FormState {
  layout: 'horizontal' | 'vertical' | 'inline';
  date: Moment | undefined;
  shop: string;
  item: string;
  brand: string;
  groupNumber: number;
  quantity: number;
  price: number;
  singlePrice: number;
  total: number;
  memo: string;
}
export interface FormRules {
  date: any;
  shop: any;
  name: any;
  item: any;
  brand: any;
  groupNumber: any,
  quantity: any;
  price: any;
  singlePrice: any;
  total: any;
}
export interface DateState {
  label: string;
  name: string;
  value: Moment | undefined;
  date: Moment | undefined;
}

export interface InputState {
  label: string;
  name: string;
  value: string;
}