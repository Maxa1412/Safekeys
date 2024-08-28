import SKSError from './addons/SKSError';
import SKSWarn from './addons/SKSWarn';
import Colors from './addons/Colors';
interface SKS {
  [key: string]: any;
}
declare namespace NodeJS {
  interface Process {
    sks?: SKS;
  }
}
declare const init: (debug?: boolean) => Promise<void>;
declare const has: (key: string) => boolean;
declare const get: (key: string) => any;
declare const remove: (key: string) => boolean;
declare const format: (verify?: boolean) => {};
export { init, has, get, remove, format, SKSError, SKSWarn, Colors };
export { ErrorsCat as Errors } from './addons/ErrorsCat';
