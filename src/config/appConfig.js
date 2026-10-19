/** Runtime configuration shared by the application. */
const moduleScript = [...document.scripts].find((script) => script.type === 'module' && script.src);
const runtimeBaseUrl = window.location.protocol === 'file:'
  ? './'
  : moduleScript
    ? new URL('../', moduleScript.src).pathname
    : import.meta.env.BASE_URL;

export const appConfig = Object.freeze({
  baseUrl: runtimeBaseUrl.endsWith('/') ? runtimeBaseUrl : `${runtimeBaseUrl}/`,
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? '',
});

export function assetUrl(path) {
  const normalizedPath = String(path).replace(/^\/+/, '');
  return `${appConfig.baseUrl}${normalizedPath}`;
}
