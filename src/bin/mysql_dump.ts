#!/usr/bin/env node

import { Command } from 'commander'
import fs from 'fs'
import mkdirp from 'mkdirp'
import mysqldump from 'mysqldump'
import path from 'path'
import { cwd } from 'process'

var packageFile = null
try {
    packageFile = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../package.json')).toString())
} catch (e) {
    throw '解析package文件失败'
}

var program = new Command()

program
    .name('mysql_dump')
    .usage('[options]')
    .addHelpText('beforeAll', '导出mysql数据库为sql')
    .requiredOption('-a, --addr <addr>', '地址')
    .requiredOption('-t, --port <port>', '端口')
    .requiredOption('-u, --user <user>', '用户名')
    .requiredOption('-p, --pwd <pwd>', '密码')
    .requiredOption('-d, --database <database>', '数据库名称')
    .requiredOption('-o, --out <file.sql>', '导出的sql路径')
    .addHelpText(
        'after',
        `
命令示例:

    导出数据库到文件:
    lsby_mysql_dump -a 172.28.185.198 -t 3306 -u root -p root -d test -o ./out.sql

更多信息: https://github.com/lsby/mysql_dump
        `,
    )

async function main() {
    program.parse(process.argv)
    var opts = program.opts()

    var outPath = path.resolve(cwd(), opts.out)
    await mkdirp(path.dirname(outPath))

    await mysqldump({
        connection: {
            host: opts.addr,
            port: opts.port,
            user: opts.user,
            password: opts.pwd,
            database: opts.database,
        },
        dumpToFile: outPath,
    })
    console.log('操作完成')
}
main()
