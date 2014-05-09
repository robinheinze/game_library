class GamesController < ApplicationController
  def index
    @games = Game.all
    if params[:keyword]
      @games = Game.search(params[:keyword])
    end
    render :json => @games
  end

  def create
    @game = Game.new(game_params)

    if @game.save
      render :json => @game, :status => 201
    else
      render :json => @game.errors, :status => 422
    end
  end

  def show
    @game = Game.find(params[:id])
    render :json => @game
  end

  def update
    @game = Game.find(params[:id])
    if @game.update(game_params)
      head :no_content
    else
      render :json => @game.errors, :status => 422
    end
  end

  def destroy
    @game = Game.find(params[:id])
    @game.destroy
    head :no_content
  end

private

  def game_params
    params.fetch(:game).permit(:title, :description, :image, :year, :console, :company, :inProgress)
  end
end
