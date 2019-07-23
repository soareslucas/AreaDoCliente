package br.jus.tjgo.litigantes;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Data;

@Data
@Entity
public class Escritorio {

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
	private boolean possuiAdvogado;
	private String advogadoMaster;
	private boolean recebeCitacao;
	private String emailMaster;
	private String identificacaoMaster;




	private Escritorio() {}

	public Escritorio(String cnpj, String nome, String endereco, String nomeRepresentante, String cpf,  String email, String vinculo, String telefone, String celular, boolean possuiAdvogado, String advogadoMaster, boolean recebeCitacao, String emailMaster, String identificacaoMaster) {
		this.id = id;
		this.cnpj = cnpj;
		this.nome = nome;
		this.endereco = endereco;
		this.nomeRepresentante = nomeRepresentante;
		this.cpf = cpf;
		this.email = email;
		this.vinculo = vinculo;
		this.telefone = telefone;
		this.celular = celular;
		this.possuiAdvogado = possuiAdvogado;
		this.advogadoMaster = advogadoMaster;
		this.recebeCitacao = recebeCitacao;
		this.emailMaster = emailMaster;
		this.identificacaoMaster = identificacaoMaster;




		
	}
}