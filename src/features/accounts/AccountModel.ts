import {
    accessControl, model, field, createdAt,
    lastUpdatedAt, unique, required, userGroup
} from "@eunovo/superbackend"

@accessControl('accounts')
@model('Account')
export class Account {

    _id?: string

    @required()
    @field('username', 'String')
    username!: string

    @userGroup('owner', 'address')
    @unique() @required()
    @field('address', 'String')
    address!: string

    @createdAt()
    @field('createdAt', 'Date')
    createdAt!: Date

    @lastUpdatedAt()
    @field('lastUpdatedAt', 'Date')
    lastUpdatedAt!: Date
}
