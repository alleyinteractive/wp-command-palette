<?php
/**
 * Plugin Name: WP Command Palette
 * Plugin URI: https://github.com/alleyinteractive/wp-command-palette
 * Description: Admin-wide command palette for easy access to setting pages.
 * Version: 0.0.0
 * Author: Sean Fisher
 * Author URI: https://github.com/alleyinteractive/wp-command-palette
 * Requires at least: 5.9
 * Tested up to: 6.2
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
