import { inject } from '@vercel/analytics';

// Wait for DOM to be ready before initializing analytics
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Vercel Analytics
    inject();
    console.log('Vercel Analytics initialized');
});