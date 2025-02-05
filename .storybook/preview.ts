import type { Preview } from '@storybook/react';
import { initialize, mswLoader } from 'msw-storybook-addon';
import '../src/index.css';

initialize({
  onUnhandledRequest: (req) => {
    if (req.url.includes('/src/')) {
      return; // Silently ignore .tsx warnings
    }
    console.warn(`Unhandled request: ${req.method} ${req.url}`);
  },
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  loaders: [mswLoader],
};

export default preview;
