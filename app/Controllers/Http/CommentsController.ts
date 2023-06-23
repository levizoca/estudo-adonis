import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Comment from 'App/Models/Comment'
import Moment from 'App/Models/Moment'

export default class CommentsController {

    public async store({ request, params, response }: HttpContextContract) {
        const body = request.body()
        const momentId = params.momentId

        await Moment.findOrFail(momentId)

        body.moment_id = momentId
        const comment = await Comment.create(body)
        response.status(201)

        return {
            message: "Comentário adicionado com sucesso!",
            data: comment,
        }
    }

    public async destroy({ params }: HttpContextContract) {
        const comment = await Comment.findOrFail(params.id)
        await comment.delete()
        return {
            message: "Comentário deletado com sucesso!",
        }
    }

}
