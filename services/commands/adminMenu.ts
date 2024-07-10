import { arrowRight } from '@wordpress/icons';
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

    index.push({
      label: `Go to ${parentMenuLink.textContent}`,
      name: `wp-command-palette/${slugify(parentMenuLink.textContent || href)}`,
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
        label: `Go to: ${parentMenuLink.textContent} – ${submenuItem.textContent}`,
        name: `wp-command-palette/${slugify(`${parentMenuLink.textContent}: ${submenuItem.textContent}`)}`,
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
