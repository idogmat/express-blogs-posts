import mongoose from "mongoose"

export type PostInputModel = {
    title: string // max 30
    shortDescription: string // max 100
    content: string // max 1000
    blogId?: string // valid
    blogName?: string
    createdAt?: Date
}

export type PostViewModel = {
    id: mongoose.Types.ObjectId
    title: string // max 30
    shortDescription: string // max 100
    content: string // max 1000
    blogId: string // valid
    blogName: string
    createdAt: Date
}