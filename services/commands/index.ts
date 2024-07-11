import adminBar from './adminBar';
import adminMenu from './adminMenu';

/**
 * Commands available to be added by the plugin.
 */
const commands = () => [
  ...adminBar(),
  ...adminMenu(),
];

export default commands;
