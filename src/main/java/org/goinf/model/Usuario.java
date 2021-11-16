package org.goinf.model;

import javax.persistence.PostLoad;
import javax.persistence.Transient;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonIgnore;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;


import lombok.Data;

@Data
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

	public void setPasswordEncoded(String password) {
		this.password = password;
	}

	public Usuario() {}

	public Usuario(String name, String password, String... roles) {
		this.name = name;
		this.setPassword(password);
		this.roles = roles;
	}

	public Usuario(Usuario usuario) {
		this.name = usuario.name;
		this.password = usuario.password;
		this.roles = usuario.roles;
	}

	@JsonIgnore
	@Transient
    private Usuario previousState;


	@PostLoad
	private void setPreviousState(){
        this.previousState = new Usuario(this);
	}

	public Usuario getPreviousState(){
        return this.previousState;
    }


}