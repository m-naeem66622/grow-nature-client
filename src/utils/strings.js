export function toKebabCase(str = "") {
  return str.toLowerCase().replace(/\s+/g, "-");
}

export function toTitleCase(str = "") {
  return str
    .split(str.includes("-") ? "-" : " ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
