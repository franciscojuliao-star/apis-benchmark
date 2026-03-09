package com.projetos.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Data
@Entity
@Table(name = "projetos")
public class Projeto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String titulo;

    @Column(nullable = false)
    private String coordenador;

    @Column(nullable = false)
    private String curso;

    @Column(nullable = false)
    private Integer ano;

    @JdbcTypeCode(SqlTypes.VARCHAR)
    @Column(nullable = false)
    private String status = "ativo";
}