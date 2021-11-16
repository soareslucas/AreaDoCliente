package org.goinf;

import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeSave;

import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.stereotype.Component;

import org.goinf.model.*;
import org.goinf.repository.*;


@Component
@RepositoryEventHandler(Usuario.class)
public class SpringDataRestEventHandler {
	
	private UsuarioRepository usuarioRepository;

	@Autowired
	public SpringDataRestEventHandler(UsuarioRepository usuarioRepository) {
		this.usuarioRepository = usuarioRepository;
	}


	@HandleBeforeSave
	public void handleUsuarioBeforeSave(Usuario usuario) {



		if(Usuario.PASSWORD_ENCODER.matches("", usuario.getPassword() )){


			System.out.println("senha vazia");

			usuario.setPasswordEncoded(usuario.getPreviousState().getPassword());


		}


/* 		System.out.println("senha vazia");
			
		Usuario user = new Usuario (usuario.getPreviousState());

		System.out.println(usuario.getPassword().equals(user.getPassword()) );

		user.setName("testeForcado");
		user.setRoles(usuario.getRoles());

		usuario = new Usuario (user);

		usuario.setName("testeForcado");


		System.out.println(usuario.getPassword());

		System.out.println(user.getPassword());

		System.out.println(usuario.getPassword().equals(user.getPassword()) ); */

	}
	
	
}