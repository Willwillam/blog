const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ message: '未授权访问' });
  }

  res.status(500).json({ message: '服务器错误' });
};

module.exports = errorHandler; 