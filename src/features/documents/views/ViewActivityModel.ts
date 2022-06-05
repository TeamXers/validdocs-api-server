import { model, createdAt, field, lastUpdatedAt } from "@eunovo/superbackend"

@model('ViewActivity')
export class ViewActivity {

    _id?: string

    @field('userAddress', 'String')
    userAddress!: string;

    @field('tokenId', 'number')
    tokenId!: number

    @createdAt()
    @field('createdAt', 'Date')
    createdAt!: Date

    @lastUpdatedAt()
    @field('lastUpdatedAt', 'Date')
    lastUpdatedAt!: Date
}
