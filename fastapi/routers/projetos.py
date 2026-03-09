from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db
from models import Projeto
from schemas import ProjetoCreate, ProjetoUpdate, ProjetoResponse

router = APIRouter(prefix="/projetos", tags=["Projetos"])


@router.post("/", response_model=ProjetoResponse, status_code=201)
async def criar_projeto(projeto: ProjetoCreate, db: AsyncSession = Depends(get_db)):
    db_projeto = Projeto(**projeto.model_dump())
    db.add(db_projeto)
    await db.commit()
    await db.refresh(db_projeto)
    return db_projeto


@router.get("/", response_model=List[ProjetoResponse])
async def listar_projetos(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Projeto))
    return result.scalars().all()


@router.get("/{id}", response_model=ProjetoResponse)
async def buscar_projeto(id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Projeto).where(Projeto.id == id))
    projeto = result.scalar_one_or_none()
    if not projeto:
        raise HTTPException(status_code=404, detail="Projeto não encontrado")
    return projeto


@router.put("/{id}", response_model=ProjetoResponse)
async def atualizar_projeto(id: int, dados: ProjetoUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Projeto).where(Projeto.id == id))
    projeto = result.scalar_one_or_none()
    if not projeto:
        raise HTTPException(status_code=404, detail="Projeto não encontrado")
    for campo, valor in dados.model_dump().items():
        setattr(projeto, campo, valor)
    await db.commit()
    await db.refresh(projeto)
    return projeto


@router.delete("/{id}", status_code=204)
async def deletar_projeto(id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Projeto).where(Projeto.id == id))
    projeto = result.scalar_one_or_none()
    if not projeto:
        raise HTTPException(status_code=404, detail="Projeto não encontrado")
    await db.delete(projeto)
    await db.commit()
