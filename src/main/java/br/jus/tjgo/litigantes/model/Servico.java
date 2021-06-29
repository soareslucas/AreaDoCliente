package br.jus.tjgo.litigantes.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Servico {

	private @Id @GeneratedValue Long id;

	private String name;
    private Float valor;


	public Servico() {}

	public Servico(String name, Float valor) {
		this.name = name;
        this.valor = valor;

	}
	

}