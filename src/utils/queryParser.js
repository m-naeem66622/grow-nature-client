export const queryParser = (obj) => {
  const query = new URLSearchParams();
  for (const key in obj) {
    const value = obj[key];
    // skip the key if the value is falsy
    if (!value) continue;
    if (Array.isArray(value)) {
      value.forEach((item) => query.append(`${key}[]`, item));
    } else {
      query.append(key, value);
    }
  }

  return query.toString();
};
