/*
  All webhook subscriptions should be saved in the database EXCEPT for the uninstall hook.
  This is because Shopify will delete any webhook for which it receives 19 consecutive non-200 response codes.
  This means that deleted webhooks must be identified on app startup and resubscribed.

  ALTERNATIVELY

  It might be a good idea to keep a count of webhooks the app will rely on, and check that a merchant is subscribed to that number of hooks.
  If they aren't, resubscribe to all.

*/
