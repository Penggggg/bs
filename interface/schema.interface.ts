

export interface ISUser {
    _id: string
    name: string
    phone: string
    password: string
    meta: {
        createdTime: string,
        updatedTime: string
    }
}