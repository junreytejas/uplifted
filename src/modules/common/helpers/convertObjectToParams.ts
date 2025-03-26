export async function convertObjectToParams(object: object): Promise<string> {
  return new URLSearchParams([...Object.entries(object)]).toString();
}
