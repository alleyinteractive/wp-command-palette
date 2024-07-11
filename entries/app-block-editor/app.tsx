import { useMemo } from 'react';
import { useCommandLoader } from '@wordpress/commands';
import commands from '@/services/commands';

/**
 * Command Palette Application within the Block Editor as a plugin
 */
function AppBlockEditor() {
  const availableCommands = useMemo(() => commands(), []);

  useCommandLoader({
    name: 'wp-command-palette',
    hook: () => ({
      commands: availableCommands,
      isLoading: false,
    }),
  });

  return null;
}

export default AppBlockEditor;
