<?php
/**
 * Contains functions for working with assets (primarily JavaScript).
 *
 * phpcs:disable phpcs:ignore Squiz.PHP.CommentedOutCode.Found
 *
 * @package wp-command-palette
 */

namespace Alley\WP\Command_Palette;

function action__admin_enqueue_scripts() {
	$screen = get_current_screen();

	// Disable for block editor pages.
	if ( $screen && $screen->is_block_editor ) {
		return;
	}

	$dir_entry_name = 'admin';
	$dependencies = get_asset_dependency_array( 'command-palette' );
	// var_dump($dependencies);exit;
	$version = get_asset_version( 'command-palette' );

	// Enqueue the admin script.
	wp_enqueue_script(
		'wp-command-palette-admin',
		get_entry_asset_url( 'command-palette' ),
		$dependencies,
		$version,
		true
	);

	wp_enqueue_style( 'wp-components' );
	wp_enqueue_style( 'wp-elements' );
	wp_enqueue_style( 'wp-commands' );
}
add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\action__admin_enqueue_scripts' );

/**
 * Validate file paths to prevent a PHP error if a file doesn't exist.
 *
 * @param string $path The file path to validate.
 * @return bool        True if the path is valid and the file exists.
 */
function validate_path( string $path ): bool {
	return ( 0 === validate_file( $path ) || 2 === validate_file( $path ) ) && file_exists( $path );
}

/**
 * Get the entry points directory path or public URL.
 *
 * @param string  $dir_entry_name The directory name where the entry point was defined.
 * @param boolean $dir            Optional. Whether to return the directory path or the plugin URL path. Defaults to false (returns URL).
 *
 * @return string
 */
function get_entry_dir_path( string $dir_entry_name, bool $dir = false ): string {
	// The relative path from the plugin root.
	$asset_build_dir = "/build/{$dir_entry_name}/";
	// Set the absolute file path from the root directory.
	$asset_dir_path = WP_COMMAND_PALETTE_DIR . $asset_build_dir;

	if ( validate_path( $asset_dir_path ) ) {
		// Negotiate the base path.
		return true === $dir
			? $asset_dir_path
			: plugins_url( $asset_build_dir, __DIR__ );
	}

	return '';
}

/**
 * Get the assets dependencies and version.
 *
 * @param string $dir_entry_name The entry point directory name.
 *
 * @return array{dependencies?: string[], version?: string}
 */
function get_entry_asset_map( string $dir_entry_name ): array {
	$base_path = get_entry_dir_path( $dir_entry_name, true );

	if ( ! empty( $base_path ) ) {
		$asset_file_path = trailingslashit( $base_path ) . 'index.asset.php';

		if ( validate_path( $asset_file_path ) ) {
			return include $asset_file_path; // phpcs:ignore WordPressVIPMinimum.Files.IncludingFile.IncludingFile, WordPressVIPMinimum.Files.IncludingFile.UsingVariable
		}
	}

	return [];
}

/**
 * Get the dependency array for a given asset.
 *
 * @param string $dir_entry_name The entry point directory name.
 *
 * @return array<int, string> The asset's dependency array.
 */
function get_asset_dependency_array( string $dir_entry_name ): array {
	$asset_arr = get_entry_asset_map( $dir_entry_name );
	return $asset_arr['dependencies'] ?? [];
}

/**
 * Get the version hash for a given asset.
 *
 * @param string $dir_entry_name The entry point directory name.
 *
 * @return string The asset's version hash.
 */
function get_asset_version( string $dir_entry_name ): string {
	$asset_arr = get_entry_asset_map( $dir_entry_name );
	return $asset_arr['version'] ?? '1.0';
}

/**
 * Get the public url for the assets entry file.
 *
 * @param string $dir_entry_name The entry point directory name.
 * @param string $filename       The asset file name including the file type extension to get the public path for.
 * @return string                The public URL to the asset, empty string otherwise.
 */
function get_entry_asset_url( string $dir_entry_name, $filename = 'index.js' ) {
	if ( empty( $filename ) ) {
		return '';
	}

	if ( validate_path( trailingslashit( get_entry_dir_path( $dir_entry_name, true ) ) . $filename ) ) {
		$entry_base_url = get_entry_dir_path( $dir_entry_name );

		if ( ! empty( $entry_base_url ) ) {
			return trailingslashit( $entry_base_url ) . $filename;
		}
	}

	return '';
}
