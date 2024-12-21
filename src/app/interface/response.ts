

export interface IResponseData<T> {

    success: boolean,
    message?: string,
    statusCode: number,
    data?: T

}