import { Command, CommandMenu, useCommandLoader } from '@wordpress/commands';
import { arrowRight } from '@wordpress/icons';

// import {
//   post, page, layout, symbolFilled,
// } from '@wordpress/icons';
import { useCallback } from 'react';

function App() {
  console.log('aaa');

  const settingsPageLinks = useCallback(() => {
    const links = document.querySelectorAll('#adminmenu a');
    const index: Command[] = [];

    Array.from(links).forEach((link) => {
      const url = link.getAttribute('href');
      let label = link.textContent;

      if (url?.endsWith('edit-comments.php')) {
        label = 'Comments';
      }

      if (url && label) {
        index.push({
          label: `Go to Settings: ${label}`,
          url,
          name: url,
          icon: arrowRight,
          callback: (args: any) => {
            console.log('the args', args);

            window.location.href = url;
          },
        });
      }
    });

    return index;
  }, []);

  // function usePageSearchCommandLoader({ search }) {
  //   console.log('search', search);

  //   return {
  //     commands: settingsPageLinks(),
  //     isLoading: false,
  //   };
  //   // // Retrieve the pages for the "search" term.
  //   // const { records, isLoading } = useSelect( ( select ) => {
  //   //     const { getEntityRecords } = select( coreStore );
  //   //     const query = {
  //   //         search: !! search ? search : undefined,
  //   //         per_page: 10,
  //   //         orderby: search ? 'relevance' : 'date',
  //   //     };
  //   //     return {
  //   //         records: getEntityRecords( 'postType', 'page', query ),
  //   //         isLoading: ! select( coreStore ).hasFinishedResolution(
  //   //             'getEntityRecords',
  //   //             'postType', 'page', query ]
  //   //         ),
  //   //     };
  //   // }, [ search ] );

  //   // // Create the commands.
  //   // const commands = useMemo( () => {
  //   //     return ( records ?? [] ).slice( 0, 10 ).map( ( record ) => {
  //   //         return {
  //   //             name: record.title?.rendered + ' ' + record.id,
  //   //             label: record.title?.rendered
  //   //                 ? record.title?.rendered
  //   //                 : __( '(no title)' ),
  //   //             icon: icons[ postType ],
  //   //             callback: ( { close } ) => {
  //   //                 const args = {
  //   //                     postType,
  //   //                     postId: record.id,
  //   //                     ...extraArgs,
  //   //                 };
  //   //                 document.location = addQueryArgs( 'site-editor.php', args );
  //   //                 close();
  //   //             },
  //   //         };
  //   //     } );
  //   // }, [ records, history ] );

  //   // return {
  //   //     commands,
  //   //     isLoading,
  //   // };
  // }

  useCommandLoader({
    name: 'wp-command-palette',
    hook: () => ({
      commands: settingsPageLinks(),
      isLoading: false,
    }),
  });

  return (
    <CommandMenu />
  );
}

export default App;
