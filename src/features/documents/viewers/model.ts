import { accessControl, model, createdAt, field, lastUpdatedAt, unique } from "@eunovo/superbackend"

@accessControl('viewers')
@model('Viewer')
export class Viewer {

    _id?: string

    @unique()
    @field('user', 'String')
    userAddress!: string

    @field('document', 'Document')
    document!: string

    @createdAt()
    @field('createdAt', 'Date')
    createdAt!: Date

    @lastUpdatedAt()
    @field('lastUpdatedAt', 'Date')
    lastUpdatedAt!: Date
}
