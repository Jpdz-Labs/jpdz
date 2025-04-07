import { inject } from '@vercel/analytics';

// Initialize Vercel Analytics immediately
inject();
console.log('Vercel Analytics initialized');

// No need to wait for DOMContentLoaded when using ES modules
// as modules are already deferred by default