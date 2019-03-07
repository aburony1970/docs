const path = require( 'path' )
const container = require( 'markdown-it-container' )
const fs = require( 'fs' )

// Return a list of files of the specified fileTypes in the provided dir,
// with the file path relative to the given dir
// dir: path of the directory you want to search the files for
// fileTypes: array of file types you are search files, ex: ['.txt', '.jpg']
function getFilesFromDir(dir, fileTypes) {
	var filesToReturn = [];
	function walkDir(currentPath) {
		var files = fs.readdirSync(currentPath);
		for (var i in files) {
			var curFile = path.join(currentPath, files[i]);
			if (fs.statSync(curFile).isFile() && fileTypes.indexOf(path.extname(curFile)) != -1) {
				filesToReturn.push(curFile.replace(dir, ''));
			} else if (fs.statSync(curFile).isDirectory()) {
				walkDir(curFile);
			}
		}
	};
	walkDir(dir);
	return filesToReturn;
}


module.exports = ctx => ({
	// dest: '../redux_docs',
	base: '/redux-docs/', // TODO - REMOVE ME
	locales: {
		'/': {
			lang: 'en-US',
			title: 'Redux',
			description: 'The WordPress Interface Framework',
			// footer: 'Dovy was here',
		},
	},
	head: [
		['link', {rel: 'icon', href: `/logo.png`}],
		['link', {rel: 'manifest', href: '/manifest.json'}],
		['meta', {name: 'theme-color', content: '#3ea5ce'}],
		['meta', {name: 'apple-mobile-web-app-capable', content: 'yes'}],
		['meta', {name: 'apple-mobile-web-app-status-bar-style', content: 'black'}],
		['link', {rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png`}],
		['link', {rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3ea5ce'}],
		['meta', {name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png'}],
		['meta', {name: 'msapplication-TileColor', content: '#000000'}]
	],
	// theme: '@vuepress/vue',
	themeConfig: {
		repo: 'dovy/redux-docs', // TODO Update me
		editLinks: true,
		docsDir: 'docs',
		// #697 Provided by the official algolia team.
		algolia: ctx.isProd ? ({
			apiKey: '',
			indexName: 'reduxframework'
		}) : null,
		locales: {
			'/': {
				label: 'English',
				selectText: 'Languages',
				editLinkText: 'Edit this page on GitHub',
				lastUpdated: 'Last Updated',
				nav: require( './nav/en' ),
				sidebar: {
					'/guides/': getSidebar( 'Guides', '/guides/' ),
					'/configuration/': getSidebar( 'Configuration', '/configuration/' ),
					'/core-fields/': getSidebar( 'Fields', '/core-fields/' ),
					'/premium/': getSidebar( 'Premium / Pro', '/premium/' ),
					'/core-extensions/': getSidebar( 'Core Extensions', '/core-extensions/' )
				}
			},

		}
	},
	plugins: [
		// ['@vuepress/plugin-i18n-ui', !ctx.isProd],
		['@vuepress/back-to-top', true],
		['@vuepress/pwa', {
			serviceWorker: true,
			updatePopup: false
		}],
		['@vuepress/medium-zoom', true],
		['@vuepress/notification', true],
		['@vuepress/google-analytics', {
			ga: '' // TODO - ADD ME
		}],
	],
	// clientRootMixin: path.resolve( __dirname, 'mixin.js' ),
	extendMarkdown( md ) {
		md.use( container, 'upgrade', {
			render: ( tokens, idx ) => tokens[idx].nesting === 1
				? `<UpgradePath title="${tokens[idx].info.trim().slice( 'upgrade'.length ).trim()}">`
				: '</UpgradePath>'
		} )
	},
})

function getSidebar( title, path, collapsable = false, depth = 0 ) {
	var the_path = __filename.split( '/.vuepress' )[0]
	var the_files = getFilesFromDir(the_path + path, [".md"]);
	var to_return = []

	// if ($vm.$frontmatter.sidebarDepth) {
	// 	depth = window.$vm.$frontmatter.sidebarDepth;
	// }
	// console.log(module);


	// if (introduction !== '') {
	// 	to_return.push(['', introduction])
	// }
	var top = ""
	the_files.forEach( file => {
		if ( file.substring( file.length - 3, file.length ) == ".md" ) {
			file = file.substring( 0, file.length - 3 )
			// to_return.push( file )
			if ( file.toLowerCase() != "index" && file.toLowerCase() != "readme" ) {
				to_return.push( file )
			} else {
				top = file
				// to_return.push( file )
			}
		}
	} );

	// if ( top !== '' ) {
	// 	// title = resolveHeaders(top)
	// 	// console.log(ctx);
	// 	// console.log(themeConfig);
	// 	// to_return.unshift( ['', top] );
	// 	var new_return = []
	// 	new_return.push( ["hello",top] )
	// 	to_return = new_return + to_return
	// 	// to_return.unshift( ["hello",top] );
	// }



	var the_return = [
		{
			title: title,
			collapsable: collapsable,
			sidebarDepth: depth,
			children: to_return
		},
	];
	return the_return;



}

