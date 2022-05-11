import { accessControl, model, createdAt, field, lastUpdatedAt, unique, required } from "@eunovo/superbackend"

@accessControl('viewers')
@model('Viewer')
export class Viewer {

    _id?: string

    @required()
    @field('userAddress', 'String')
    userAddress!: string

    @required()
    @field('documentTokenId', 'String')
    documentTokenId!: string

    @createdAt()
    @field('createdAt', 'Date')
    createdAt!: Date

    @lastUpdatedAt()
    @field('lastUpdatedAt', 'Date')
    lastUpdatedAt!: Date
}
