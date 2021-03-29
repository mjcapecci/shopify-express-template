export interface ISubscriptionDetails {
  callbackUrl: string;
  format: 'JSON' | 'XML';
  includeFields?: [string];
  metafieldNamespaces?: [string];
}

export interface ISubscribe {
  subscribeToWebhook(
    topic: string,
    webhookSubscription: ISubscriptionDetails
  ): any;
}
