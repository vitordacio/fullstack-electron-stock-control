import { server } from './app';

server.listen(process.env.PORT || 3001, async () => {
  /* eslint-disable no-console */
  console.log('Server running');
});
