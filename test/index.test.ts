import exec_cmd from '@lsby/exec_cmd'
import * as tools from '@lsby/js_tools'
import 'mocha'
import path from 'path'

describe('测试组', function () {
    it('测试', async function () {
        var r = await exec_cmd(
            `node ${path.resolve(
                __dirname,
                '../dist/bin/mysql_dump.js',
            )} -a 172.28.185.198 -t 3306 -u root -p root -d test -o ./out.sql`,
        )
        tools.断言相等(r[0], '操作完成')
    })
})
