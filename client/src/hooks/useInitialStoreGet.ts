export default function useInitialStoreGet() {
  return {
    initialStoreGet: async () => {
      const res = await fetch('/api/shop/initial');
      return await res.json();
    },
  };
}
