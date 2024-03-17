export interface Sender {
  id: number;
  name: string;
  pricePerMessage: number;
}

export interface SendMessageResponse {
  status: number;
  responseToken: string;
  transaction_cost: number;
}

export interface MessageStatusResponse {
  status: number;
  data: {
    status: string;
    sent_at: string;
    delivered_at: string;
    receiver: {
      number: string;
      mcc: string;
      mnc: string;
    };
  };
}

export interface CreditCheckResponse {
  status: number;
  credit_value: number;
}

export interface SendMessageRequest {
  to: string;
  sender: string;
  body: string;
  type?: "marketing" | "transactional" | "otp";
  webhook_status?: string;
  generate_unsubscribe_link?: 0 | 1;
  remove_special_chars?: 0 | 1;
}
