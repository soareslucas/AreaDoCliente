package br.jus.tjgo.litigantes.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.core.authority.*;


import org.springframework.stereotype.Component;
import br.jus.tjgo.litigantes.model.*;
import br.jus.tjgo.litigantes.repository.*;

import java.util.ArrayList;




 @Component
 public class DatabaseLoader implements CommandLineRunner {

 	private final PlanoRepository planos;
	private final ServicoRepository servicos;

	private final UsuarioRepository usuarios;


 	@Autowired
 	public DatabaseLoader(UsuarioRepository usuarioRepository, PlanoRepository planoRepository, ServicoRepository servicoRepository) {
 		this.planos = planoRepository;
		 this.servicos = servicoRepository;
		 this.usuarios = usuarioRepository;


 	}

 	@Override
 	public void run(String... strings) throws Exception {



   		//this.usuarios.save(new Usuario("teste2", "123456", "ROLE_MANAGER") );  
 		

 	}
 }