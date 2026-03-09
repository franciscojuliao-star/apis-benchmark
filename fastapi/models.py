import enum

from sqlalchemy import Column, Integer, String, Enum

from database import Base


class StatusEnum(str, enum.Enum):
    ativo = "ativo"
    finalizado = "finalizado"


class Projeto(Base):
    __tablename__ = "projetos"

    id          = Column(Integer, primary_key=True, index=True)
    titulo      = Column(String(255), nullable=False)
    coordenador = Column(String(255), nullable=False)
    curso       = Column(String(255), nullable=False)
    ano         = Column(Integer, nullable=False)
    status      = Column(Enum(StatusEnum), nullable=False, default=StatusEnum.ativo)
