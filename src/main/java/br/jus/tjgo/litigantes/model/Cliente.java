package br.jus.tjgo.litigantes.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.ManyToMany;
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;
import javax.persistence.FetchType;


import lombok.Data;

@Data
@Entity
public class Cliente {

	private @Id @GeneratedValue Long id;
	private String cnpj;
	private String nome;
	private String endereco;
	private String nomeRepresentante;
	private String cpf;
	private String email;
	private String vinculo;
	private String telefone;
	private String celular;
	private String status;
    private byte[] data;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="seguimento_id")
	private Seguimento seguimento;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "cliente_has_plano", joinColumns = {
			@JoinColumn(name = "cliente_id", nullable = false, updatable = false) }, inverseJoinColumns = {
					@JoinColumn(name = "plano_id", nullable = false, updatable = false) })
	private List<Plano> planos = new ArrayList<>();


	public Cliente() {}

	public Cliente(String status, byte[] data, String cnpj, String nome, String endereco, String nomeRepresentante, String cpf,  String email, String vinculo, String telefone, String celular, Seguimento seguimento, List<Plano> planos) {
		this.cnpj = cnpj;
		this.nome = nome;
		this.endereco = endereco;
		this.nomeRepresentante = nomeRepresentante;
		this.cpf = cpf;
		this.email = email;
		this.vinculo = vinculo;
		this.telefone = telefone;
		this.celular = celular;
		this.seguimento = seguimento;
		this.planos = planos;
	}

	
	
	
	
}