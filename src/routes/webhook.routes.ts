export default async function (app, options) {
  app.get('/', async () => {
    return { message: 'Hello Redação' };
  });

}
