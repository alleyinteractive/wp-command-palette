<?php
/**
 * Plugin Name: WP Command Palette
 * Plugin URI: https://github.com/alleyinteractive/wp-command-palette
 * Description: Extend the WordPress Command Palette with all the available admin menu items.
 * Version: 0.1.0
 * Author: Sean Fisher
 * Author URI: https://github.com/alleyinteractive/wp-command-palette
 * Requires at least: 6.4
 * Tested up to: 6.5
 *
 * Text Domain: wp-command-palette
 * Domain Path: /languages/
 *
 * @package wp-command-palette
 */

namespace Alley\WP\Command_Palette;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Root directory to this plugin.
 */
define( 'WP_COMMAND_PALETTE_DIR', __DIR__ );

// Load the plugin's main files.
require_once __DIR__ . '/src/assets.php';
