class Api::V1::CommentsController < ApiController
  def create
    offer = Offer.find(params["offerId"])
    comment = Comment.new(body: params[:body])
    comment.user = current_user
    comment.offer = offer

    if comment.save
      comment.save
      render json: comment
    else
      render json: {
        errors: comment.errors.messages,
        fields: comment
      }
    end
  end
end
