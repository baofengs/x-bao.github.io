const gitment = new Gitment({
  id: 'sanf.cn', // optional
  owner: 'x-bao',
  repo: 'comments.sanbf.cn.git',
  oauth: {
    client_id: 'cb47ea77291035eb786a',
    client_secret: '1873a59b6cd1c2cba326e7f5161fa903b180276f',
  }
})

gitment.render('comments')
