export function stripUserNameFromEmail(email: string) {
  const pattern = new RegExp(
    /^(?:[A-Z\d][A-Z\d_-]{5,10}|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})$/i,
  );
  const welcomeHandle = pattern.exec(email)?.[0]?.split('@')?.[0] ?? email;
  return welcomeHandle;
}
