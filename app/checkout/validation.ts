export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): T {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (...args: any[]) {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => func(...args), wait);
  } as T;
}
