import { PaymentMethod } from '../../types';

export type ListPaymentMethodsResponse = {
  payment_methods?: PaymentMethod;
};

export type GetPaymentMethodRequest = {
  payment_method_id: string;
};

export type GetPaymentMethodResponse = {
  payment_method?: PaymentMethod;
};
