import { API_STATUS } from "./define"
type ApiResult = {
    code: number,
    msg: string | null,
    data: any | null
}

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

const successResult = (msg: string | null, data?: any | null) => {
    let res: ApiResult = {
        code: API_STATUS.SUCCESS,
        msg: msg,
        data: data
    };
    return res;
}

const errorResult = (msg: string | null) => {
    let res: ApiResult = {
        code: API_STATUS.FAILED,
        msg: msg,
        data: null
    };
    return res;
}

const paramErrorResult = (msg: string | null) => {
    let res: ApiResult = {
        code: API_STATUS.PARAMERROR,
        msg: msg,
        data: null
    };
    return res;
}

const notFoundResult = (msg: string | null) => {
    let res: ApiResult = {
        code: API_STATUS.NOTFOUND,
        msg: msg,
        data: null
    };
    return res;
}

export {
    paramErrorResult,
    errorResult,
    successResult,
    notFoundResult
}