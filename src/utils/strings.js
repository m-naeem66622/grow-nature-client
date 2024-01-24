export function toKebabCase(str) {
  return str.toLowerCase().replace(/\s+/g, "-");
}

export function toTitleCase(str) {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
