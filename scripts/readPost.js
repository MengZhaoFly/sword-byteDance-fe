const fs = require('fs');

async function read() {
  const res = [];
  async function walk(parent, path) {
    const dir = await fs.promises.opendir(path);
    for await (const dirent of dir) {
      // 跳过入口文件 当访问到这个 url 时，会作为组件展示
      if (dirent.name === 'index.jsx') continue;
      // 不是目录 并且也不是 md 文件跳过 处理不了
      if (!dirent.isDirectory() && !dirent.name.endsWith('md')) continue;
      const stats = await fs.promises.lstat(path);
      const node = {
        name: dirent.name,
        ctime: stats.ctime,
        mtime: stats.mtime
      };
      let routePath = path;
      routePath = routePath.split('/')
        .map((p) => {
          if (p.includes('(')) {
            const i = p.indexOf('(');
            const j = p.indexOf(')');
            return p.slice(i + 1, j);
          }
          return p;
        })
        .map((p) => encodeURIComponent(p))
        .join('/')
        .slice(1); // 由文件的路径生成地址栏 URL， 路径可能是相对的， 去除前面的 ./
      let fileRoutePath = dirent.name;
      let routeName = dirent.name;
      if (fileRoutePath.includes('(')) {
        const i = fileRoutePath.indexOf('(');
        const j = fileRoutePath.indexOf(')');
        fileRoutePath = fileRoutePath.slice(i + 1, j);
        routeName = routeName.slice(0, i);
      }
      node.path = routePath + fileRoutePath; // 路径名：供 URL 使用  父级路径 + 文件名
      node.routePath = path; // 原始的文件路径
      node.routeName = routeName; // 路径名：供 Menu 显示 人看
      // 这个 文件路径 供 react-router 读取组件
      const component = `.${path}${dirent.name}${dirent.isDirectory() ? '/index' : ''}`;
      node.component = component;
      if (dirent.isDirectory()) {
        node.routes = [];
        parent.push(node);
        await walk(node.routes, `${path}${dirent.name}/`);
      } else {
        parent.push(node);
      }
    }
  }
  // 脚本运行是在根目录下运行
  // node scripts/readPost.js
  await walk(res, './posts/');
  // console.log(JSON.stringify(res, null, 2));
  return res;
}
module.exports = read;
