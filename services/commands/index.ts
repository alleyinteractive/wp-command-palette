import adminMenu from './adminMenu';

/**
 * Commands available to be added by the plugin.
 */
const commands = () => [
  ...adminMenu(),
];

export default commands;
