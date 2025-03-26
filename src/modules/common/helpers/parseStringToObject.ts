export function parseStringToObject(value: string) {
  if (!value || typeof value !== 'string') {
    return;
  }

  // Replace single quotes with double quotes
  const jsonFormatted = value
    .replace(/'/g, '"') // Convert single quotes to double quotes
    .replace(/(\w[\w\d_.]*)\s*:\s*([^,{}\[\]]+)/g, '"$1":"$2"'); // Match keys with dots and format them with quotes

  try {
    return JSON.parse(jsonFormatted);
  } catch (error) {
    console.error('JSON parsing error:', error);
    return null; // Return null or handle parsing errors
  }
}
