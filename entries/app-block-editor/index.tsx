import { StrictMode } from 'react';
import { registerPlugin } from '@wordpress/plugins';
import AppBlockEditor from './app';

registerPlugin('wp-command-palette', {
  render: () => (
    <StrictMode>
      <AppBlockEditor />
    </StrictMode>
  ),
});
