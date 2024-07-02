import { Router } from 'express'
import { getCommentController } from './controllers/getCommentController'
import { tokenAuthorizationMiddleware } from '../../global-middlewares/tokenAuthorizationMiddleware '
import { deleteCommentController } from './controllers/deleteCommentController'
import { putCommentController } from './controllers/putCommentController'


export const commentsRouter = Router()

// postsRouter.post('/',
//   adminMiddleware,
//   ...postCreateValidators,
//   createPostController);

// postsRouter.get('/', getPostsController)
commentsRouter.get('/:id', getCommentController)
commentsRouter.delete('/:id', tokenAuthorizationMiddleware, deleteCommentController)
commentsRouter.put('/:id', tokenAuthorizationMiddleware, putCommentController)

// не забудьте добавить роут в апп