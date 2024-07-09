import { arrowRight } from '@wordpress/icons';
import type { Command } from '@wordpress/commands';

/**
 * Collect all admin menu links as possible commands.
 */
const adminMenu = (): Command[] => {
  const links = document.querySelectorAll('#adminmenu a');
  const index: Command[] = [];

  Array.from(links).forEach((link) => {
    const url = link.getAttribute('href');

    if (!url || url === '#') {
      return;
    }

    let label = link.textContent;

    if (url.endsWith('edit-comments.php')) {
      label = 'Comments';
    }

    if (url && label) {
      index.push({
        label: `Go to Settings: ${label}`,
        name: url,
        icon: arrowRight,
        callback: () => {
          window.location.href = url;
        },
      });
    }
  });

  return index;
};

export default adminMenu;
