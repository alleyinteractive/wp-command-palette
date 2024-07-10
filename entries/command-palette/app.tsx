import { useMemo } from 'react';
import { CommandMenu, useCommandLoader } from '@wordpress/commands';
import commands from '@/services/commands';

/**
 * Command Palette Application
 *
 * @todo Add support for use of our commands inside block editor.
 */
function App() {
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

export default App;
