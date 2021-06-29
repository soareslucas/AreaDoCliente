package br.jus.tjgo.litigantes.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;


import lombok.Data;
import lombok.ToString;

@Data
@ToString(exclude = "password")
@Entity
public class Usuario {

	public static final PasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();

	private @Id @GeneratedValue Long id;

	private String name;

	private String password;

	private String[] roles;

	public void setPassword(String password) {
		this.password = PASSWORD_ENCODER.encode(password);
	}

	public Usuario() {}

	public Usuario(String name, String password, String... roles) {
		this.name = name;
		this.setPassword(password);
		this.roles = roles;
	}
	
	

}