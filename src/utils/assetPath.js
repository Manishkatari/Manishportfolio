export const resolveAssetPath = (path) => {
  if (!path) return "";

  if (/^https?:\/\//i.test(path) || path.startsWith("//")) {
    return path;
  }

  const cleanedPath = path
    .replace(/^\.\.\/public\//, "")
    .replace(/^\/+/, "");

  return `${import.meta.env.BASE_URL}${cleanedPath}`;
};
