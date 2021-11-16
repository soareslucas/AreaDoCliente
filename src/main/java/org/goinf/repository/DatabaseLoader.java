package org.goinf.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.core.authority.*;


import org.springframework.stereotype.Component;

import org.goinf.model.*;
import org.goinf.repository.*;

import java.util.ArrayList;




 @Component
 public class DatabaseLoader implements CommandLineRunner {

 	private final PlanoRepository planos;
	private final ServicoRepository servicos;
	private final UsuarioRepository usuarios;

 	@Autowired

 	public DatabaseLoader(PlanoRepository planoRepository, ServicoRepository servicoRepository, UsuarioRepository usuarioRepository) {
 		this.planos = planoRepository;
		this.servicos = servicoRepository;
		this.usuarios = usuarioRepository; 	}

 	@Override
 	public void run(String... strings) throws Exception {



   		//this.planos.save(new Plano("Básico", new Long(2) , list, new Float(500), false ) ); 
		//this.usuarios.save(new Usuario("admin", "123456", "ROLE_MANAGER"));
 		

 	}
 }
