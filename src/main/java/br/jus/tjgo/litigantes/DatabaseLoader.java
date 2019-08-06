package br.jus.tjgo.litigantes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;

import org.springframework.stereotype.Component;
import br.jus.tjgo.litigantes.model.*;
import br.jus.tjgo.litigantes.repository.*;



 @Component
 public class DatabaseLoader implements CommandLineRunner {

 	private final ManagerRepository managers;

 	@Autowired
 	public DatabaseLoader(ManagerRepository managerRepository) {
 		this.managers = managerRepository;
 	}

 	@Override
 	public void run(String... strings) throws Exception {

// 		this.managers.save(new Manager("admin", "123456",
// 							"ROLE_MANAGER"));
 		

 	}
 }