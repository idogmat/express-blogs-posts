import { Request, Response } from 'express'
import { IBlogWithPostsViewModelAfterQuery } from '../../../input-output-types/blogs-types'
import { blogsRepository } from '../blogsRepository'
import { isValidObjectId } from '../../../utils/query-helper'
import mongoose from 'mongoose'
import { PostInputModel, PostViewModel } from '../../../input-output-types/posts-types'

interface IBlogId {
  id: mongoose.Types.ObjectId | string
}

export const postPostsInBlogController = async (req: Request<IBlogId, {}, PostInputModel>, res: Response<PostViewModel>) => {
  const id = isValidObjectId(req.params.id)
  if (!id) {
    res.sendStatus(404)
    return
  }
  const data = await blogsRepository.postPostsInBlog(id, req.body);
  data 
  ? res.status(201).json(data) 
  : res.sendStatus(400)
  

}