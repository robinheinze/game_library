class ResultsController < ApplicationController

  def index
    results = Result.all
    if params[:search_id]
      results = Result.where(search_id: params[:search_id])
    end
    render :json => results
  end


  private

  def result_params
    params.fetch(:result).permit(:search_id, :game_id)
  end

end
