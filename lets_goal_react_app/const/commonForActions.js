export const BASE_URL = 'http://10.0.2.2:8000/';
// export const BASE_URL = 'http://127.0.0.1:8000/';
// export const BASE_URL = 'http://192.168.137.1/';

export function timeout(ms, promise) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('timeout'));
    }, ms);
    promise.then(resolve, reject);
  });
}
