export default async () => {
  if ((global as any).__ELASTIC_CONTAINER__) {
    console.log('Finalizando container Elastic');
    await (global as any).__ELASTIC_CONTAINER__.stop();
  }
};
