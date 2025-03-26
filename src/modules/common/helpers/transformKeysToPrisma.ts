export const transformFilterKeysToPrisma = (obj: Record<string, any>) => {
  const transformed: Record<string, any>[] = [];

  for (const key in obj) {
    if (key.includes('.')) {
      const keys = key.split('.');
      let nested: Record<string, any> = {
        [keys.pop()!]: obj[key],
      };

      // Build the nested structure from the bottom up
      while (keys.length > 0) {
        const currentKey = keys.pop()!;
        nested = { [currentKey]: nested };
      }

      transformed.push(nested);
    } else {
      transformed.push({
        [key]: { contains: obj[key] },
      });
    }
  }

  return transformed;
};

export const transformOrderKeysToPrisma = (obj) => {
  return Object.fromEntries(Object.entries(obj));
};
