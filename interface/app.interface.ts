
/**用户信息：返回 */
export interface _IUser {
    _id: string
    name: string,
    phone: string,
    meta: {
        createdTime: string
    }
}

/**项目信息 */
export interface IProject {
    name: string
    info: string
    cover: string,
    creator: _IUser
}
