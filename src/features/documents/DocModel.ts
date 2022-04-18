import {
    accessControl, model, createdAt, field, lastUpdatedAt,
    unique, required, defaultValue
} from "@eunovo/superbackend"

@accessControl('documents')
@model('Document')
export class Document {

    _id?: string

    @required()
    @field('author', 'String')
    author!: string

    @required()
    @field('name', 'String')
    name!: string

    @required()
    @field('description', 'String')
    description!: string

    @unique() @required()
    @field('tokenId', 'String')
    tokenId!: string

    @defaultValue([]) @required()
    @field('tags', '[String]')
    tags!: string[]

    @defaultValue(true) @required()
    @field('isPublic', 'Boolean')
    isPublic!: boolean

    @createdAt()
    @field('createdAt', 'Date')
    createdAt!: Date

    @lastUpdatedAt()
    @field('lastUpdatedAt', 'Date')
    lastUpdatedAt!: Date
}
