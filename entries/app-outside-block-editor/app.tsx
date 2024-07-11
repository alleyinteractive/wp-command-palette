import { useMemo } from 'react';
import { CommandMenu, useCommandLoader } from '@wordpress/commands';
import commands from '@/services/commands';

/**
 * Command Palette Application Outside the Block Editor
 *
 * This is a workaround until {@link https://github.com/WordPress/gutenberg/pull/54515} is implemented
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
