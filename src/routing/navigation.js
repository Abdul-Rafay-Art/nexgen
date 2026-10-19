import { appConfig } from '../config/appConfig.js';

// The app may be hosted at the domain root or under a directory such as
// /staging/nexgen/. Infer that directory from the loaded module URL.
const moduleScript = [...document.scripts].find(
  (script) => script.type === 'module' && script.src,
);
const deployedBasePath = moduleScript
  ? new URL('../', moduleScript.src).pathname.replace(/\/$/, '')
  : '';
const configuredBasePath = appConfig.baseUrl.replace(/\/$/, '');
const basePath = deployedBasePath || (configuredBasePath === '.' ? '' : configuredBasePath);

export function toBase(path) {
  if (window.location.protocol === 'file:') return `#${path}`;
  if (path === '/') return appConfig.baseUrl;
  return `${basePath}${path}`;
}

export function fromBase(pathname = window.location.pathname) {
  if (window.location.protocol === 'file:') return window.location.hash.slice(1) || '/';
  if (basePath && pathname === basePath) return '/';
  if (basePath && !pathname.startsWith(`${basePath}/`)) return pathname;
  const path = basePath ? pathname.slice(basePath.length) : pathname;
  return path === '' || path === '/' ? '/' : path;
}

export function navigate(path) {
  if (window.location.protocol === 'file:') {
    window.location.hash = path;
  } else {
    window.history.pushState({}, '', toBase(path));
  }
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
