// 修复版启动入口
import * as serverModule from './server.js';

console.log('🔍 正在智能分析 server.js 导出内容...');

function start() {
    try {
        const defaultExport = serverModule.default;
        const startServer = serverModule.startServer;
        const app = serverModule.app;
        const PORT = process.env.PORT || 8080;

        // 策略 1: 默认导出就是 Express App 实例 (有 .listen 方法)
        if (defaultExport && typeof defaultExport.listen === 'function') {
            console.log('✅ 检测到 Express App 实例 (default)，正在启动监听...');
            defaultExport.listen(PORT, () => {
                console.log(`🚀 Server running on http://localhost:${PORT}`);
            });
            return;
        }

        // 策略 2: 导出了名为 app 的实例
        if (app && typeof app.listen === 'function') {
            console.log('✅ 检测到 Express App 实例 (named export)，正在启动监听...');
            app.listen(PORT, () => {
                console.log(`🚀 Server running on http://localhost:${PORT}`);
            });
            return;
        }

        // 策略 3: 默认导出是一个启动函数 (且不是 App 实例)
        if (typeof defaultExport === 'function') {
            console.log('✅ 检测到启动函数 (default)，正在执行...');
            // 注意：这里不再 await，防止它是同步函数或者返回非 Promise
            const result = defaultExport(); 
            if (result instanceof Promise) {
                result.catch(err => console.error('❌ 启动函数报错:', err));
            }
            return;
        }

        // 策略 4: 导出了名为 startServer 的函数
        if (typeof startServer === 'function') {
            console.log('✅ 检测到 startServer 函数，正在执行...');
            startServer();
            return;
        }

        console.error('❌ 无法识别启动方式！server.js 似乎没有导出 app 或启动函数。');
        console.log('导出内容概览:', Object.keys(serverModule));

    } catch (error) {
        console.error('💥 启动失败:', error);
    }
}

// 执行启动逻辑
start();