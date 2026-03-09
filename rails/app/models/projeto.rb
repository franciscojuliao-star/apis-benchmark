class Projeto < ApplicationRecord
  STATUSES = %w[ativo finalizado].freeze

  validates :titulo, :coordenador, :curso, :ano, presence: true
  validates :status, inclusion: { in: STATUSES }
end
