export function toKebabCase(str = "") {
  return str.toLowerCase().replace(/\s+/g, "-");
}

export function toTitleCase(str = "") {
  return str
    .split(str.includes("-") ? "-" : " ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export const formatTime = (time) => {
  const hours = Math.floor(time / 100);
  const minutes = time % 100;
  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  return `${formattedHours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} ${period}`;
};
