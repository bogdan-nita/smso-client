// SmsoClient.ts
import {
  Sender,
  SendMessageRequest,
  SendMessageResponse,
  MessageStatusResponse,
  CreditCheckResponse,
} from "./types";

export class Client {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string, baseUrl: string = "https://app.smso.ro/api/v1") {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  private async makeRequest<T>(
    endpoint: string,
    method: "GET" | "POST" = "GET",
    body?: any
  ): Promise<T> {
    const headers = new Headers({
      "X-Authorization": this.apiKey,
      "Content-Type": "application/json",
    });

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method,
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status}`);
    }

    return response.json() as Promise<T>;
  }

  public getSenders(): Promise<Sender[]> {
    return this.makeRequest<Sender[]>("/senders");
  }

  public sendMessage(data: SendMessageRequest): Promise<SendMessageResponse> {
    return this.makeRequest<SendMessageResponse>("/send", "POST", data);
  }

  public checkMessageStatus(
    responseToken: string
  ): Promise<MessageStatusResponse> {
    return this.makeRequest<MessageStatusResponse>(
      `/status?responseToken=${responseToken}`
    );
  }

  public checkCredit(): Promise<CreditCheckResponse> {
    return this.makeRequest<CreditCheckResponse>("/credit-check");
  }
}

export default Client;
