import { accessControl, model, createdAt, field, lastUpdatedAt, required } from "@eunovo/superbackend"

@accessControl('invitations')
@model('Invite')
export class Invite {

    _id?: string

    @required()
    @field('metadata', 'Mixed')
    metadata!: any

    /**
     * address
     */
    @required()
    @field('createdBy', 'String')
    createdBy!: string

    @field('numberOfUsesLeft', 'Number')
    numberOfUsesLeft?: number

    @field('validUntil', 'Date')
    validUntil?: string

    @createdAt()
    @field('createdAt', 'Date')
    createdAt!: Date

    @lastUpdatedAt()
    @field('lastUpdatedAt', 'Date')
    lastUpdatedAt!: Date
}
