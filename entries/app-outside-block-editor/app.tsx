import { useMemo } from 'react';
import { CommandMenu, useCommandLoader } from '@wordpress/commands';
import commands from '@/services/commands';

/**
 * Command Palette Application Outside the Block Editor
 */
function AppOutsideBlockEditor() {
  const availableCommands = useMemo(() => commands(), []);

  useCommandLoader({
    name: 'wp-command-palette',
    hook: () => ({
      commands: availableCommands,
      isLoading: false,
    }),
  });

  return (
    <CommandMenu />
  );
}

export default AppOutsideBlockEditor;
