import { appConfig } from '../config/appConfig';

/** Error raised when an API response is not successful. */
export class ApiError extends Error {
  constructor(message, { status = 0, details } = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

/** Shared JSON request helper; endpoint modules should build on this function. */
export async function requestJson(path, options = {}) {
  if (!appConfig.apiBaseUrl) {
    throw new ApiError('The API is not configured for this environment.');
  }

  let response;
  try {
    response = await fetch(new URL(path.replace(/^\/+/, ''), `${appConfig.apiBaseUrl.replace(/\/+$/, '')}/`), {
      ...options,
      headers: {
        Accept: 'application/json',
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
        ...options.headers,
      },
    });
  } catch (error) {
    throw new ApiError('Unable to connect to the service. Please try again.', { details: error });
  }

  const contentType = response.headers.get('content-type') || '';
  const body = contentType.includes('application/json')
    ? await response.json().catch(() => null)
    : await response.text().catch(() => '');

  if (!response.ok) {
    const message = body && typeof body === 'object' && body.message
      ? body.message
      : `Request failed (${response.status}).`;
    throw new ApiError(message, { status: response.status, details: body });
  }

  return body;
}
