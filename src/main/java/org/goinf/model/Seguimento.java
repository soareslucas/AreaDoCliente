package org.goinf.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Data;

@Data
@Entity
public class Seguimento {

	private @Id @GeneratedValue Long id;

	private String name;


	public Seguimento() {}

	public Seguimento(String name) {
		this.name = name;
	}
	

}