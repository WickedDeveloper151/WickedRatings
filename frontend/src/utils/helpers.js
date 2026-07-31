/**
 * Wraps a fetch function to prevent rapid, successive API calls while typing.
 * Uses AbortController to cancel previous requests if a new one is fired.
 */
export function debounceWithAbort(fetchFunction, delay) {
  let timeoutId;
  let controller;

  return (...args) => {
    if (controller) {
      controller.abort();
    }

    clearTimeout(timeoutId);
    controller = new AbortController();

    timeoutId = setTimeout(async () => {
      try {
        await fetchFunction(...args, controller.signal);
      } finally {
        controller = null;
      }
    }, delay);
  };
}