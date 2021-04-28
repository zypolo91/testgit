## CONTRIBUTING.md

* [Bug反馈](#bug)

* [Pull Request流程图示](#pull)


<h3 id="bug">Bug反馈</h3>

1.提交途径

* 推荐使用issue,

  >  简单，拖拽即可上传截图，方便反馈存档，利于帮助其他存在问题的人，避免重复问题

 2.提交内容

针对存在问题反馈不够明确，建议提交包含以下内容，目前提供了一个[在线模板可供参考](https://github.com/zypolo91/testgit/issues/new?title=Bug:%20&body=**%E9%97%AE%E9%A2%98%E6%8F%8F%E8%BF%B0**%0A%EF%BC%88%E6%8F%8F%E8%BF%B0%E4%B8%80%E4%B8%8B%E9%97%AE%E9%A2%98%EF%BC%89%0A%0A**%E7%94%9F%E4%BA%A7%E7%8E%AF%E5%A2%83**%20%0A-%20%E6%B5%8F%E8%A7%88%E5%99%A8%E5%8F%8A%E7%89%88%E6%9C%AC%EF%BC%9A%20%0A-%20%E6%BC%94%E7%A4%BA%E5%9C%B0%E5%9D%80:%20%0A-%20%E6%B5%8F%E8%A7%88%E5%99%A8%E6%8A%A5%E9%94%99:%20%0A-%20%E6%88%AA%E5%9B%BE:)，个人填写建议包含以下内容:

```
**问题描述**
（描述一下问题）

**生产环境** 
- 浏览器及版本： 
- 演示地址: 
- 浏览器报错: 
- 截图:
```

<h3 id="pull">Pull Request流程图示</h3>

以 [testgit](https://github.com/zypolo91/testgit) 仓库为例：

1. Fork仓库到个人Respository目录：进入仓库，点击`Fork`

2. Clone到本地

   ```
   $ git clone git@github.com:zypolo91/testgit.git
   ```

3. 创建分支

   ```
   $ git checkout -b fixer
   ```

4. 修改后提交

   ```
   $ git add .
   $ git commit -m "fix:some bug"
   $ git push origin fixer
   ```

5. 提交`pull request`:登陆github,进入`fork`后的仓库，切换到新提交的`fixer`分支，点击右侧绿色按钮`Compare& pull request`

6. 添加注释信息，确认提交
