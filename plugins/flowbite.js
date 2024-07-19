export default defineNuxtPlugin((nuxtApp) => {
    useFlowbite(() => {
      initFlowbite();
    });
});

function useFlowbite(callback) {
  if (import.meta.client) {
    import('flowbite').then((flowbite) => {
      callback(flowbite);
    });
  }
}
