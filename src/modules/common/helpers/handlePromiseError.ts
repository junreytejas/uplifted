export const handlePromiseError = async <T>(
  request: Promise<T>,
): Promise<[Error | null, T | null]> => {
  try {
    const data = await request;

    return [null, data];
  } catch (error) {
    return [error as any, null];
  }
};

export const handleArrayPromiseError = async <T extends any[]>(
  request: [...{ [K in keyof T]: Promise<T[K]> }],
): Promise<[Error | null, T | null]> => {
  try {
    const data = await Promise.all(request);
    return [null, data];
  } catch (error) {
    return [error as any, null];
  }
};
