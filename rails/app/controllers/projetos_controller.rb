class ProjetosController < ApplicationController
  before_action :set_projeto, only: [:show, :update, :destroy]

  def index
    render json: Projeto.all
  end

  def show
    render json: @projeto
  end

  def create
    projeto = Projeto.new(projeto_params)
    if projeto.save
      render json: projeto, status: :created
    else
      render json: projeto.errors, status: :unprocessable_entity
    end
  end

  def update
    if @projeto.update(projeto_params)
      render json: @projeto
    else
      render json: @projeto.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @projeto.destroy
    head :no_content
  end

  private

  def set_projeto
    @projeto = Projeto.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { erro: "Projeto não encontrado" }, status: :not_found
  end

  def projeto_params
    params.permit(:titulo, :coordenador, :curso, :ano, :status)
  end
end
