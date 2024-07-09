declare module '@wordpress/commands' {
  export type Command = {
    name: string;
    label: string;
    icon?: import('react').ReactNode;
    callback: (args: { close: () => void }) => void;
  };

  export type CommandHookCallback = (args: { search: string }) => {
    commands: Command[];
    isLoading: boolean;
  };

  export function useCommandLoader({ name, hook }: {
    name: string;
    hook: CommandHookCallback,
  }): void;

  export function CommandMenu(): JSX.Element;
}
