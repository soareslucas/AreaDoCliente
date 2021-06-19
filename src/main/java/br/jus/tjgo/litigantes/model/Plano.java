package br.jus.tjgo.litigantes.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonIgnore;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;


import lombok.Data;
import lombok.ToString;

@Data
@Entity
public class Plano {

	private @Id @GeneratedValue Long id;

	private String name;


	public Plano() {}

	public Plano(String name) {
		this.name = name;
	}
	

}