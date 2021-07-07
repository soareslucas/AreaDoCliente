package br.jus.tjgo.litigantes.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;

import org.springframework.stereotype.Component;
import br.jus.tjgo.litigantes.model.*;
import br.jus.tjgo.litigantes.repository.*;

import java.util.ArrayList;




 @Component
 public class DatabaseLoader implements CommandLineRunner {

 	private final PlanoRepository planos;
	private final ServicoRepository servicos;


 	@Autowired
 	public DatabaseLoader(PlanoRepository planoRepository, ServicoRepository servicoRepository) {
 		this.planos = planoRepository;
		 this.servicos = servicoRepository;

 	}

 	@Override
 	public void run(String... strings) throws Exception {

/* 		ArrayList<Servico> list = new ArrayList<Servico>();

		Servico servico = this.servicos.findServicoById(new Long(21));

		list.add( servico);

   		this.planos.save(new Plano("Básico", new Long(2) , list, new Float(500), false ) );  */
 		

 	}
 }