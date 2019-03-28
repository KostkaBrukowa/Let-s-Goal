export const BASE_URL = 'http://10.0.2.2:8000/';
// export const BASE_URL = 'http://127.0.0.1:8000/';
// export const BASE_URL = 'http://192.168.137.1/';

export class TimeoutError {
  constructor(message) {
    this.message = message;
    this.name = 'Error'; // (different names for different built-in error classes)
  }
}
export function timeout(ms, promise) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new TimeoutError('Connection timeout'));
    }, ms);
    promise.then(resolve, reject);
  });
}
