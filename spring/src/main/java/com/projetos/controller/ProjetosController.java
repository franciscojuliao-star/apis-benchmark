package com.projetos.controller;

import com.projetos.model.Projeto;
import com.projetos.repository.ProjetoRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/projetos")
@Tag(name = "Projetos", description = "API REST para gerenciamento de projetos")
public class ProjetosController {

    private final ProjetoRepository repository;

    public ProjetosController(ProjetoRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    @Operation(summary = "Listar todos os projetos")
    public List<Projeto> listar() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar projeto por ID")
    public ResponseEntity<Projeto> buscar(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @Operation(summary = "Criar um novo projeto")
    public ResponseEntity<Projeto> criar(@RequestBody Projeto projeto) {
        Projeto salvo = repository.save(projeto);
        return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar projeto por ID")
    public ResponseEntity<Projeto> atualizar(@PathVariable Long id, @RequestBody Projeto dados) {
        return repository.findById(id).map(projeto -> {
            projeto.setTitulo(dados.getTitulo());
            projeto.setCoordenador(dados.getCoordenador());
            projeto.setCurso(dados.getCurso());
            projeto.setAno(dados.getAno());
            projeto.setStatus(dados.getStatus());
            return ResponseEntity.ok(repository.save(projeto));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar projeto por ID")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}