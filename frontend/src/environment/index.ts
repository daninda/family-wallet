import Env from './interface';
import local from './local';
import production from './production';

const env: Env = process.env.NODE_ENV === 'production' ? production : local;

export default env;
