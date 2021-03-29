import Shopify from '@shopify/shopify-api';
import { ISubscribe, ISubscriptionDetails } from '../../../types/Webhook';

export default class Uninstall implements ISubscribe {
  private client;

  constructor(shop_name: string, shop_token: string) {
    this.client = new Shopify.Clients.Graphql(shop_name, shop_token);
  }

  subscribeToWebhook = async (
    topic: string,
    webhookSubscription: ISubscriptionDetails
  ) => {
    try {
      const res: any = await this.client.query({
        data: `mutation {
          webhookSubscriptionCreate(topic: APP_UNINSTALLED, webhookSubscription: {callbackUrl: "${webhookSubscription.callbackUrl}"}) {
            userErrors {
              field
              message
            }
            webhookSubscription {
              id
            }
          }
        }`,
      });

      if (res.body?.errors) {
        throw new Error(res.body.error);
      }
      return;
    } catch (error) {
      console.log(error);
    }
  };
}
