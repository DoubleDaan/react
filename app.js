import { createServer } from 'node:http';
import fetch from 'node-fetch';
import os from 'os';
import { promises as dns } from 'dns';

async function getIP() {
    const response = await fetch('https://ipinfo.io/json');
    return response.json();

    // // 总内存（字节）
    // const totalMemory = os.totalmem();
    // console.log(`总内存: ${(totalMemory / 1024 / 1024 / 1024).toFixed(2)} GB`);

    // // 空闲内存（字节）
    // const freeMemory = os.freemem();
    // console.log(`空闲内存: ${(freeMemory / 1024 / 1024 / 1024).toFixed(2)} GB`);

    // // 已使用内存
    // const usedMemory = totalMemory - freeMemory;
    // console.log(`已使用内存: ${(usedMemory / 1024 / 1024 / 1024).toFixed(2)} GB`);

    // // 内存使用率
    // const memoryUsage = ((totalMemory - freeMemory) / totalMemory * 100).toFixed(2);
    // console.log(`内存使用率: ${memoryUsage}%`);


    // // 获取 CPU 架构
    // console.log(`CPU 架构: ${os.arch()}`);

    // // 获取 CPU 详细信息
    // const cpus = os.cpus();
    // console.log(`CPU 核心数: ${cpus.length}`);
    // cpus.forEach((cpu, index) => {
    //     console.log(`核心 ${index + 1}: ${cpu.model}, 频率: ${cpu.speed} MHz`);
    // });
}

const server = createServer(async (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`${new Date().toLocaleString()} - ${JSON.stringify(await getIP())}`);
});

server.listen(3000, async () => {
    console.log('Listening on 3000');

    async function getDomainIP(domain) {
        try {
            const addresses = await dns.resolve4(domain);
            console.log(`域名 ${domain} 的 IP 地址：`, addresses);
            return addresses;
        } catch (error) {
            console.error(`获取 ${domain} 的 IP 地址失败：`, error.message);
            throw error;
        }
    }

    const addresses = await dns.lookup('host.docker.internal');

    console.log(`域名 'host.docker.internal' 的 IP 地址: ${addresses.address}`);
});