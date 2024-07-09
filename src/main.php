<?php
/**
 * The main plugin function
 *
 * @package wp-command-palette
 */

namespace Alley\WP\Command_Palette;

use Alley\WP\Features\Group;

/**
 * Instantiate the plugin.
 */
function main(): void {
	// Add features here.
	$plugin = new Group();

	$plugin->boot();
}
