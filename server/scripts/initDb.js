const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const initializeAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // 检查是否已存在管理员账号
    const adminExists = await User.findOne({ username: 'wangwen' });
    
    if (!adminExists) {
      await User.create({
        username: 'wangwen',
        password: 'admin',
        email: 'admin@example.com',
        role: 'admin'
      });
      console.log('管理员账号创建成功');
    } else {
      console.log('管理员账号已存在');
    }
    
    mongoose.connection.close();
  } catch (error) {
    console.error('初始化失败:', error);
    process.exit(1);
  }
};

initializeAdmin(); 