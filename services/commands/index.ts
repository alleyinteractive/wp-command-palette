import adminBar from './adminBar';
import adminMenu from './adminMenu';

/**
 * Commands available to be added by the plugin.
 *
 * Note: the order here matters to determine priority in the command palette.
 */
const commands = () => [
  ...adminMenu(),
  ...adminBar(),
];

export default commands;
