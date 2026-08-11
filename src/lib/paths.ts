const basePath = import.meta.env.BASE_URL;

export function withBase(path: string) {
  if (!path.startsWith('/')) return path;
  return `${basePath.replace(/\/$/, '')}${path}`;
}

export function withoutBase(path: string) {
  const normalizedBase = basePath.replace(/\/$/, '');
  return normalizedBase && path.startsWith(normalizedBase)
    ? path.slice(normalizedBase.length) || '/'
    : path;
}
