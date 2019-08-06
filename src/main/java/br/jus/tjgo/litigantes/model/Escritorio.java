package br.jus.tjgo.litigantes.model;

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
	private String status;
    private byte[] data;



	public Escritorio(String status, byte[] data, String cnpj, String nome, String endereco, String nomeRepresentante, String cpf,  String email, String vinculo, String telefone, String celular, boolean possuiAdvogado, String advogadoMaster, boolean recebeCitacao, String emailMaster, String identificacaoMaster) {
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

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCnpj() {
		return cnpj;
	}

	public void setCnpj(String cnpj) {
		this.cnpj = cnpj;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getEndereco() {
		return endereco;
	}

	public void setEndereco(String endereco) {
		this.endereco = endereco;
	}

	public String getNomeRepresentante() {
		return nomeRepresentante;
	}

	public void setNomeRepresentante(String nomeRepresentante) {
		this.nomeRepresentante = nomeRepresentante;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getVinculo() {
		return vinculo;
	}

	public void setVinculo(String vinculo) {
		this.vinculo = vinculo;
	}

	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}

	public String getCelular() {
		return celular;
	}

	public void setCelular(String celular) {
		this.celular = celular;
	}

	public boolean isPossuiAdvogado() {
		return possuiAdvogado;
	}

	public void setPossuiAdvogado(boolean possuiAdvogado) {
		this.possuiAdvogado = possuiAdvogado;
	}

	public String getAdvogadoMaster() {
		return advogadoMaster;
	}

	public void setAdvogadoMaster(String advogadoMaster) {
		this.advogadoMaster = advogadoMaster;
	}

	public boolean isRecebeCitacao() {
		return recebeCitacao;
	}

	public void setRecebeCitacao(boolean recebeCitacao) {
		this.recebeCitacao = recebeCitacao;
	}

	public String getEmailMaster() {
		return emailMaster;
	}

	public void setEmailMaster(String emailMaster) {
		this.emailMaster = emailMaster;
	}

	public String getIdentificacaoMaster() {
		return identificacaoMaster;
	}

	public void setIdentificacaoMaster(String identificacaoMaster) {
		this.identificacaoMaster = identificacaoMaster;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public byte[] getData() {
		return data;
	}

	public void setData(byte[] data) {
		this.data = data;
	}
	
	
	
	
	
	
}