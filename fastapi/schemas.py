from pydantic import BaseModel

from models import StatusEnum


class ProjetoBase(BaseModel):
    titulo: str
    coordenador: str
    curso: str
    ano: int
    status: StatusEnum = StatusEnum.ativo


class ProjetoCreate(ProjetoBase):
    pass


class ProjetoUpdate(ProjetoBase):
    pass


class ProjetoResponse(ProjetoBase):
    id: int

    class Config:
        from_attributes = True
