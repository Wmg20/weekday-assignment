type DebouncedFunction<F extends (...args: any[]) => any> = (
  ...args: Parameters<F>
) => void;

export function debounce<F extends (...args: any[]) => any>(
  fn: F,
  delay: number
): DebouncedFunction<F> {
  let timer: NodeJS.Timeout;

  return function (this: unknown, ...args: Parameters<F>): void {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
