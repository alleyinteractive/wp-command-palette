import { arrowRight } from '@wordpress/icons';
import { __, sprintf } from '@wordpress/i18n';
import type { Command } from '@wordpress/commands';
import slugify from '@/services/slugify';

// Convert a element to a string while excluding all non-text child nodes.
const getElementText = (element: Element): string => {
  // Retrieve only child text nodes
  const textNodes = Array.from(element.childNodes).filter(
    (node) => node.nodeType === Node.TEXT_NODE,
  );

  return textNodes.map((node) => node.textContent).join('');
};

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

    const parentMenuHref = parentMenuLink.getAttribute('href');
    if (!parentMenuHref || parentMenuHref === '#') {
      return;
    }

    let parentMenuLinkText = parentMenuLink.textContent;

    // Try and find the proper menu name to display. For some menu items (plugins/themes/etc.)
    // the menu text will include a number of available updates we want to strip out.
    const parentMenuName = parentMenuLink.querySelector('.wp-menu-name');

    if (parentMenuName) {
      parentMenuLinkText = getElementText(parentMenuName);
    }

    index.push({
      label: sprintf(
        /* translators: %s: menu link text */
        __('Go to: %s', 'wp-command-palette'),
        parentMenuLinkText,
      ),
      name: `wp-command-palette/${slugify(parentMenuLinkText || parentMenuHref)}`,
      icon: arrowRight,
      callback: () => {
        window.location.href = parentMenuHref;
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

      // Exclude the submenu item if it's a hash link or the same as the parent
      // menu link (plugins -> installed plugins).
      if (!url || ['#', parentMenuHref].includes(url)) {
        return;
      }

      index.push({
        label: sprintf(
          /* translators: 1: parent menu link text, 2: submenu item text */
          __('Go to: %1$s – %2$s', 'wp-command-palette'),
          parentMenuLinkText,
          getElementText(submenuItem), // .textContent,
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
