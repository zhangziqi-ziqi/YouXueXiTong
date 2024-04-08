// 导入所需模块
import path from 'path';
import http from 'http';
import getRawBody from 'raw-body';
import fs from 'fs';
// 获取当前文件的目录路径
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// 定义用户文件的绝对路径
const usersFilePath = path.resolve(__dirname, '..', 'src/documents/users.json');

// 创建HTTP服务器
const server = http.createServer(async (req, res) => {
  try {
    // 解析JSON格式请求体
    const rawBody = await getRawBody(req);
    const requestBody = JSON.parse(rawBody.toString());

    // 处理登录请求
    if (req.method === 'POST' && req.url === '/api/login') {
      handleLoginRequest(requestBody, res);
    }
    // 处理注册请求
    else if (req.method === 'POST' && req.url === '/api/register') {
      handleRegisterRequest(requestBody, res);
    }
    // 其他请求返回404
    else {
      res.statusCode = 404;
      res.end('Not Found');
    }
  } catch (parseError) {
    console.error(parseError);
    res.statusCode = 400;
    res.end('Bad Request');
  }
});

// 启动服务器监听指定端口
const PORT = process.env.PORT || 5173;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// 处理登录请求
function handleLoginRequest(req, res) {
  try {
    const { email, password } = req.body;

    const data = fs.readFileSync(usersFilePath, 'utf8');
    const users = JSON.parse(data);
    const user = users.find(u => u.email === email);

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 登录成功，可根据需要返回相应信息
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// 处理注册请求
function handleRegisterRequest(req, res) {
  try {
    const { email, password } = req.body;

    const data = fs.readFileSync(usersFilePath, 'utf8');
    let users;
    try {
      users = JSON.parse(data);
    } catch (error) {
      users = [];
    }

    const existingUser = users.find(u => u.email === email);

    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    users.push({ email, password });
    const updatedUsers = JSON.stringify(users);

    fs.writeFileSync(usersFilePath, updatedUsers, 'utf8');

    // 注册成功，可根据需要返回相应信息
    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}