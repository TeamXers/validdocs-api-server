import {
    accessControl, model, createdAt, field, lastUpdatedAt,
    unique, required, defaultValue, userGroup
} from "@eunovo/superbackend"

@accessControl('documents')
@model('Document')
export class Document {

    _id?: string

    /**
     * The user's username
     */
    @userGroup('owner', 'address')
    @required()
    @field('authorAddress', 'String')
    authorAddress!: string

    @required()
    @field('name', 'String')
    name!: string

    @required()
    @field('description', 'String')
    description!: string

    @unique() @required()
    @field('tokenId', 'Number')
    tokenId!: number
    
    @unique() @required()
    @field('tranxHash', 'String')
    tranxHash!: string

    @defaultValue([])
    @field('tags', '[String]')
    tags!: string[]

    @defaultValue(false)
    @field('isPublic', 'Boolean')
    isPublic!: boolean

    @createdAt()
    @field('createdAt', 'Date')
    createdAt!: Date

    @lastUpdatedAt()
    @field('lastUpdatedAt', 'Date')
    lastUpdatedAt!: Date
}
