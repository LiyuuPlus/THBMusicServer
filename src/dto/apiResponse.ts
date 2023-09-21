import { ApiProperty } from '@nestjs/swagger';

const dateFormat = (dateStr: string | Date, formatter: string = 'yyyy-MM-dd') => {
    let date = dateStr
    if (typeof date === 'string') {
        date = new Date(dateStr)
    }
    let o = {
        'M+': date.getMonth() + 1, //月份
        'd+': date.getDate(), //日
        'h+': date.getHours(), //小时
        'm+': date.getMinutes(), //分
        's+': date.getSeconds(), //秒
        'q+': Math.floor((date.getMonth() + 3) / 3), //季度
        S: date.getMilliseconds(), //毫秒
    }
    if (/(y+)/.test(formatter)) {
        formatter = formatter.replace(
            RegExp.$1,
            (date.getFullYear() + '').substr(4 - RegExp.$1.length),
        )
    }
    for (const [k, v] of Object.entries(o)) {
        if (new RegExp('(' + k + ')').test(formatter)) {
            formatter = formatter.replace(
                RegExp.$1,
                RegExp.$1.length === 1 ? '' + v : ('00' + v).substr(('' + v).length),
            )
        }
    }
    return formatter
}

Date.prototype.toJSON = function () { return dateFormat(this, 'yyyy-MM-dd hh:mm:ss') };

const API_STATUS = {
    /**
     * 成功
     */
    SUCCESS: 200,
    /**
     * 失败
     */
    FAILED: 400,
    /**
     * 参数错误
     */
    PARAMERROR: 405,
    /**
     * 未找到
     */
    NOTFOUND: 404,
}

export class ApiResult {
    @ApiProperty({
        description: "响应代码",
        enum: API_STATUS
    })
    code: number;

    @ApiProperty({
        description: "提示",
        type: "string"
    })
    msg: string | null;

    @ApiProperty({
        description: "数据",
    })
    data: any | null | undefined;
}

export function successResult(msg: string | null, data?: any | null) {
    var result = new ApiResult();
    result.code = API_STATUS.SUCCESS;
    result.msg = msg;
    result.data = data;
    return result;
}