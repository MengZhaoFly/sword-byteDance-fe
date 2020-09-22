const MarkdownIt = require('markdown-it');
const highlightjs = require('./hightLight');

const markdownParser = new MarkdownIt({
  html: true,
  xhtmlOut: true,
  breaks: true,
  linkify: true,
  highlight: (str, lang) => {
    if (lang === undefined || lang === '') {
      lang = 'bash';
    }
    // 加上custom则表示自定义样式，而非微信专属，避免被remove pre
    if (lang && highlightjs.getLanguage(lang)) {
      try {
        const formatted = highlightjs
          .highlight(lang, str, true)
          .value.replace(/\n/g, '<br/>') // 换行用br表示
          .replace(/\s/g, '&nbsp;') // 用nbsp替换空格
          .replace(/span&nbsp;/g, 'span '); // span标签修复
        return `<pre class="custom"><code class="hljs">${formatted}</code></pre>`;
      } catch (e) {
        console.log(e);
      }
    }
    return `<pre class="custom"><code class="hljs">${markdownParser.utils.escapeHtml(str)}</code></pre>`;
  },
});
module.exports = function (source) {
  return new Promise((resolve) => {
    // markdownParser.renderer.rules.image = function () { return '/>'; };
    // function closeToken(tokens, idx, options, env, renderer) {
    //   return renderer.renderToken(tokens, idx, options).replace(/\>$/g, '/>')
    // }
    // markdownParser.renderer.rules.image  = closeToken
    let html = markdownParser.render(source);
    html = html
      .replace(/\{/g, '&#x0007B;')
      .replace(/\}/g, '&#x0007D;')
      .replace(/class/g, 'className');

    resolve(`
      import React from 'react';
      export default function Post() {
        return (
          <article id="article">
          ${html}
          </article>
        )
      }
    `);
  });
};
