import { useAppBridge } from '@shopify/app-bridge-react';
import { authenticatedFetch } from '@shopify/app-bridge-utils';

export default function useAuthenticatedHttp() {
  const app = useAppBridge();

  return {
    authenticatedGet: async (route: string) => {
      const res = await authenticatedFetch(app)(route, { method: 'GET' });
      return await res.json();
    },
    authenticatedPost: async (route: string, body: any) => {
      const res = await authenticatedFetch(app)(route, {
        method: 'POST',
        body: body,
      });
      return await res.json();
    },
  };
}
