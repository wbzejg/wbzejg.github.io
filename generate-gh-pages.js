const fs = require('fs');
const path = require('path');

// 定义文件路径
const indexPath = path.join(__dirname, 'out', 'index.html');
const notFoundPath = path.join(__dirname, 'out', '404.html');
const nojekyllPath = path.join(__dirname, 'out', '.nojekyll')

// 读取 index.html 的内容
fs.readFile(indexPath, 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }

    // 在 <head> 中添加重定向脚本
    const redirectScript = `<script>
    sessionStorage.redirect = location.pathname;
  </script>`;
    const result = data.replace('</head>', `${redirectScript}</head>`);

    // 创建 404.html 并写入新的内容
    fs.writeFile(notFoundPath, result, 'utf8', (err) => {
        if (err) return console.log(err);
    })
    fs.writeFile(nojekyllPath, '', 'utf8', (err) => {
        if (err) return console.log(err);
    })
});
