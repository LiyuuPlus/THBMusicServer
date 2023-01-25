type ApiResult = {
    code: number,
    msg: string | null,
    data: any | null
}

const successResult = (msg: string | null, data?: any | null) => {
    let res: ApiResult = {
        code: 0,
        msg: msg,
        data: data
    };
    return res;
}

const errorFoundResult = (msg: string | null) => {
    let res: ApiResult = {
        code: 400,
        msg: msg,
        data: null
    };
    return res;
}

const notFoundResult = (msg: string | null) => {
    let res: ApiResult = {
        code: 404,
        msg: msg,
        data: null
    };
    return res;
}

export {
    errorFoundResult,
    successResult,
    notFoundResult
}