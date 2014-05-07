class SearchesController < ApplicationController
  def create
    new_search = Search.new(search_params)
    if new_search.save()
      results = new_search.get_results
      render :json => new_search, :status => 201
    else
      render :json => new_search.errors, :status => 422
    end
  end

  def show
    search = Search.find(params[:id])
    render :json => search
  end

  def index
    searches = Search.all
    render :json => searches
  end

  private

  def search_params
    params.fetch(:search).permit(:keyword)
  end
end
