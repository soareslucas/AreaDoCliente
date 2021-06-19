package br.jus.tjgo.litigantes.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;

import org.springframework.stereotype.Component;
import br.jus.tjgo.litigantes.model.*;
import br.jus.tjgo.litigantes.repository.*;



 @Component
 public class DatabaseLoader implements CommandLineRunner {

 	private final UsuarioRepository usuarios;

 	@Autowired
 	public DatabaseLoader(UsuarioRepository usuarioRepository) {
 		this.usuarios = usuarioRepository;
 	}

 	@Override
 	public void run(String... strings) throws Exception {

/*   		this.usuarios.save(new Usuario("admin", "123456",
 							"ROLE_MANAGER")); */
 		

 	}
 }