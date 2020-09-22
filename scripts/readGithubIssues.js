const axios = require('axios');
const fs = require('fs');

async function run() {
  const issues = await axios('https://api.github.com/repos/MengZhaoFly/sword-byteDance-fe/issues?state=all&per_page=100');
  const posts = issues.data;
  console.log(posts.length);
  posts.forEach((post) => {
    fs.writeFile(`./githubPost/${post.title}.md`, post.body, (err) => {
      if (!err) {
        console.log('node');
      } else {
        console.log(err);
      }
    });
  });
}
run();
