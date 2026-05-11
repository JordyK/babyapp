/**
 * Data scroll behavior utility for Next.js
 * 
 * This function prevents the "missing data scroll behavior" warning
 * by providing a default implementation for server-side rendering.
 */

export function scrollBehavior() {
  // Default behavior for server-side rendering
  return {
    smooth: true,
    behavior: 'smooth',
  };
}
