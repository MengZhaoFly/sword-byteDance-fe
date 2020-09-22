const highlightjs = require('highlight.js/lib/core');//
const bash = require('highlight.js/lib/languages/bash');
const clojure = require('highlight.js/lib/languages/clojure');
const css = require('highlight.js/lib/languages/css');
const dart = require('highlight.js/lib/languages/dart');
const dockerfile = require('highlight.js/lib/languages/dockerfile');
const erlang = require('highlight.js/lib/languages/erlang');
const go = require('highlight.js/lib/languages/go');
const gradle = require('highlight.js/lib/languages/gradle');
const groovy = require('highlight.js/lib/languages/groovy');
const haskell = require('highlight.js/lib/languages/haskell');
const java = require('highlight.js/lib/languages/java');
const javascript = require('highlight.js/lib/languages/javascript');
const json = require('highlight.js/lib/languages/json');
const julia = require('highlight.js/lib/languages/julia');
const kotlin = require('highlight.js/lib/languages/kotlin');
const lisp = require('highlight.js/lib/languages/lisp');
const lua = require('highlight.js/lib/languages/lua');
const makefile = require('highlight.js/lib/languages/makefile');
const markdown = require('highlight.js/lib/languages/markdown');
const matlab = require('highlight.js/lib/languages/matlab');
const objectivec = require('highlight.js/lib/languages/objectivec');
const perl = require('highlight.js/lib/languages/perl');
const php = require('highlight.js/lib/languages/php');
const python = require('highlight.js/lib/languages/python');
const r = require('highlight.js/lib/languages/r');
const ruby = require('highlight.js/lib/languages/ruby');
const rust = require('highlight.js/lib/languages/rust');
const scala = require('highlight.js/lib/languages/scala');
const shell = require('highlight.js/lib/languages/shell');
const sql = require('highlight.js/lib/languages/sql');
const swift = require('highlight.js/lib/languages/swift');
const typescript = require('highlight.js/lib/languages/typescript');
const verilog = require('highlight.js/lib/languages/verilog');
const vhdl = require('highlight.js/lib/languages/vhdl');
const xml = require('highlight.js/lib/languages/xml');
const yaml = require('highlight.js/lib/languages/yaml');
const diff = require('highlight.js/lib/languages/diff');

highlightjs.registerLanguage('bash', bash);
highlightjs.registerLanguage('clojure', clojure);
highlightjs.registerLanguage('css', css);
highlightjs.registerLanguage('dart', dart);
highlightjs.registerLanguage('dockerfile', dockerfile);
highlightjs.registerLanguage('erlang', erlang);
highlightjs.registerLanguage('go', go);
highlightjs.registerLanguage('gradle', gradle);
highlightjs.registerLanguage('groovy', groovy);
highlightjs.registerLanguage('haskell', haskell);
highlightjs.registerLanguage('java', java);
highlightjs.registerLanguage('javascript', javascript);
highlightjs.registerLanguage('json', json);
highlightjs.registerLanguage('julia', julia);
highlightjs.registerLanguage('kotlin', kotlin);
highlightjs.registerLanguage('lisp', lisp);
highlightjs.registerLanguage('lua', lua);
highlightjs.registerLanguage('makefile', makefile);
highlightjs.registerLanguage('markdown', markdown);
highlightjs.registerLanguage('matlab', matlab);
highlightjs.registerLanguage('objectivec', objectivec);
highlightjs.registerLanguage('perl', perl);
highlightjs.registerLanguage('php', php);
highlightjs.registerLanguage('python', python);
highlightjs.registerLanguage('r', r);
highlightjs.registerLanguage('ruby', ruby);
highlightjs.registerLanguage('rust', rust);
highlightjs.registerLanguage('scala', scala);
highlightjs.registerLanguage('shell', shell);
highlightjs.registerLanguage('sql', sql);
highlightjs.registerLanguage('swift', swift);
highlightjs.registerLanguage('typescript', typescript);
highlightjs.registerLanguage('verilog', verilog);
highlightjs.registerLanguage('vhdl', vhdl);
highlightjs.registerLanguage('xml', xml);
highlightjs.registerLanguage('yaml', yaml);
highlightjs.registerLanguage('diff', diff);

module.exports = highlightjs;
