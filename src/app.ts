import 'dotenv/config';
import { envsPlugin } from './config/plugin/envs.plugin';
import { Server } from './presentation/server';

// const { PORT, MAILER_EMAIL, MAILER_SECRET_KEY, PROD } = envsPlugin();

(async() => {
  main();
})();

function main(){
  Server.start();
}
