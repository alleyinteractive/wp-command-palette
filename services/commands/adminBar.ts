import type { Command } from '@wordpress/commands';
import { globe, lockOutline, wordpress } from '@wordpress/icons';
import { __, sprintf } from '@wordpress/i18n';
import slugify from '@/services/slugify';

/**
 * Collect links from the admin bar.
 */
const adminBar = () => {
  const index: Command[] = [];
  const mySites = document.querySelector<HTMLAnchorElement>('#wpadminbar #wp-admin-bar-my-sites > a');

  if (mySites) {
    index.push({
      name: `wp-command-palette/network-${slugify(mySites.textContent || 'my-sites')}`,
      label: sprintf(
        /* translators: %s: site name */
        __('Go to: Network - %s', 'wp-command-palette'),
        mySites.textContent,
      ),
      callback: () => mySites.click(),
      icon: globe,
    });
  }

  const networkAdmin = document.querySelector<HTMLAnchorElement>('#wpadminbar #wp-admin-bar-my-sites-super-admin a');

  if (networkAdmin) {
    index.push({
      name: 'wp-command-palette/network-admin-dashboard',
      label: __('Go to: Network Admin Dashboard', 'wp-command-palette'),
      callback: () => networkAdmin.click(),
      icon: globe,
    });
  }

  const currentDashboardHref = window.location.href.replace(/\/wp-admin\/.*/, '/wp-admin/');
  const siteList = document.querySelectorAll<HTMLAnchorElement>('#wpadminbar #wp-admin-bar-my-sites-list > li > a');

  if (siteList) {
    Array.from(siteList).forEach((site, i) => {
      // Exclude the site if this is the current site we're on.
      if (currentDashboardHref === site.getAttribute('href')) {
        return;
      }

      index.push({
        name: `wp-command-palette/site-${slugify(site.textContent || `site-${i}`)}`,
        label: sprintf(
          /* translators: %s: site name */
          __('Go to: Site Dashboard - %s', 'wp-command-palette'),
          site.textContent,
        ),
        callback: () => site.click(),
        icon: wordpress,
      });
    });
  }

  const editProfile = document.querySelector<HTMLAnchorElement>('#wpadminbar #wp-admin-bar-user-info a');

  if (editProfile) {
    index.push({
      name: 'wp-command-palette/edit-profile',
      label: __('Go to: Edit Profile', 'wp-command-palette'),
      callback: () => editProfile.click(),
      icon: wordpress,
    });
  }

  const logout = document.querySelector<HTMLAnchorElement>('#wpadminbar #wp-admin-bar-logout a');

  if (logout) {
    index.push({
      name: 'wp-command-palette/logout',
      label: __('Log Out', 'wp-command-palette'),
      callback: () => logout.click(),
      icon: lockOutline,
    });
  }

  // Play well with the Alley wp-environment-switcher plugin.
  // link: https://github.com/alleyinteractive/wp-environment-switcher
  const environmentSwitcher = document.querySelectorAll<HTMLAnchorElement>('#wpadminbar #wp-admin-bar-wp-environment-switcher-default a');

  if (environmentSwitcher) {
    Array.from(environmentSwitcher).forEach((environment, i) => {
      index.push({
        name: `wp-command-palette/environment-${slugify(environment.textContent || `environment-${i}`)}`,
        label: sprintf(
          /* translators: %s: environment name */
          __('Switch to: %s Environment', 'wp-command-palette'),
          environment.textContent,
        ),
        callback: () => environment.click(),
        icon: globe,
      });
    });
  }

  return index;
};

export default adminBar;
