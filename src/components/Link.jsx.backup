import { navigate, toBase } from '../routing/navigation.js';

/** Internal links use the app's base path and client-side navigation. */
export default function Link({ href, children, className = '', ...props }) {
  const internal = href.startsWith('/');
  return (
    <a
      className={className}
      href={internal ? toBase(href) : href}
      onClick={internal ? (event) => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        navigate(href);
      } : undefined}
      {...props}
    >
      {children}
    </a>
  );
}
