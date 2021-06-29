package br.jus.tjgo.litigantes.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.FetchType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;

import lombok.*;

@Data
@Entity
public class Plano {

	private @Id @GeneratedValue Long id;
	private String name;
	private Long vigencia;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "plano_has_servico", joinColumns = {
			@JoinColumn(name = "plano_id", nullable = false, updatable = false) }, inverseJoinColumns = {
					@JoinColumn(name = "servico_id", nullable = false, updatable = false) })
	private List<Servico> servicos = new ArrayList<>();
	
	private Float valor;
	private boolean personalizado;


	public Plano() {}

	public Plano(String name, Long vigencia, List<Servico> servicos, Float valor, boolean personalizado) {
		this.name = name;
		this.vigencia = vigencia;
		this.servicos = servicos;
		this.valor = valor;
		this.personalizado = personalizado;

	}
	

}