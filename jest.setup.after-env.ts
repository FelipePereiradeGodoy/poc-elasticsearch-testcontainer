import { ReadableStream } from 'web-streams-polyfill/ponyfill/es2018';
(global as any).ReadableStream = ReadableStream;
