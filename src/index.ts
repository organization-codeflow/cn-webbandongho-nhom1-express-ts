import express, { Request, Response, NextFunction } from 'express';

const app = express();
const PORT: number = parseInt(process.env.PORT || '3000', 10);

// Middleware để parse JSON
app.use(express.json());

// Interface cho response data
interface WelcomeResponse {
  message: string;
  status: string;
  timestamp?: string;
}

interface HealthResponse {
  status: string;
  timestamp: string;
  uptime: number;
}

interface ErrorResponse {
  error: string;
  path: string;
}

// Route cơ bản
app.get('/', (req: Request, res: Response<WelcomeResponse>) => {
  res.json({
    message: 'Chào mừng đến với Express TypeScript server!',
    status: 'Server đang hoạt động',
    timestamp: new Date().toISOString()
  });
});

// Route health check
app.get('/health', (req: Request, res: Response<HealthResponse>) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Route API info
app.get('/api/info', (req: Request, res: Response) => {
  res.json({
    name: 'Express TypeScript API',
    version: '1.0.0',
    description: 'Simple Express server with TypeScript',
    endpoints: [
      'GET /',
      'GET /health',
      'GET /api/info'
    ]
  });
});

// Middleware xử lý 404
app.use('*', (req: Request, res: Response<ErrorResponse>) => {
  res.status(404).json({
    error: 'Route không tìm thấy',
    path: req.originalUrl
  });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err.message);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

// Khởi động server
app.listen(PORT, () => {
  console.log(`🚀 TypeScript Express server đang chạy tại http://localhost:${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/health`);
  console.log(`📊 API info: http://localhost:${PORT}/api/info`);
});

export default app;
