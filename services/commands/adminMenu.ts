import { arrowRight } from '@wordpress/icons';
import { __, sprintf } from '@wordpress/i18n';
import type { Command } from '@wordpress/commands';

const slugify = (text: string) => text.toLowerCase().replace(/: /g, '-').replace(/\s+/g, '-');

/**
 * Collect all admin menu links as possible commands.
 */
const adminMenu = (): Command[] => {
  const menus = document.querySelectorAll('ul#adminmenu > li');
  const index: Command[] = [];

  Array.from(menus).forEach((menu) => {
    const parentMenuLink = menu.querySelector('a');
    if (!parentMenuLink) {
      return;
    }

    const href = parentMenuLink.getAttribute('href');
    if (!href || href === '#') {
      return;
    }

    let parentMenuLinkText = parentMenuLink.textContent;

    if (href.endsWith('edit-comments.php')) {
      parentMenuLinkText = __('Comments', 'wp-command-palette');
    }

    index.push({
      label: sprintf(
        /* translators: %s: menu link text */
        __('Go to: %s', 'wp-command-palette'),
        parentMenuLinkText,
      ),
      name: `wp-command-palette/${slugify(parentMenuLinkText || href)}`,
      icon: arrowRight,
      callback: () => {
        window.location.href = href;
      },
    });

    if (!menu.classList.contains('wp-has-submenu')) {
      return;
    }

    const submenuItems = menu.querySelectorAll('.wp-submenu li a');

    if (!submenuItems.length) {
      return;
    }

    Array.from(submenuItems).forEach((submenuItem) => {
      const url = submenuItem.getAttribute('href');

      if (!url || url === '#') {
        return;
      }

      index.push({
        label: sprintf(
          /* translators: 1: parent menu link text, 2: submenu item text */
          __('Go to: %1$s – %2$s', 'wp-command-palette'),
          parentMenuLinkText,
          submenuItem.textContent,
        ),
        name: `wp-command-palette/${slugify(`${parentMenuLinkText}: ${submenuItem.textContent}`)}`,
        icon: arrowRight,
        callback: () => {
          window.location.href = url;
        },
      });
    });
  });

  return index;
};

export default adminMenu;
