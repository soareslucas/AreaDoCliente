package br.jus.tjgo.litigantes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * @author Greg Turnquist
 */
// tag::code[]
@Component
public class DatabaseLoader implements CommandLineRunner {

	private final EscritorioRepository repository;

	@Autowired
	public DatabaseLoader(EscritorioRepository repository) {
		this.repository = repository;
	}

	@Override
	public void run(String... strings) throws Exception {

		this.repository.save(new Escritorio("Frodo", "Baggins", "ring bearer", "ring bearer", "ring bearer", "ring bearer", "ring bearer", "ring bearer", "ring bearer", "ring bearer"));
		this.repository.save(new Escritorio("Bilbo", "Baggins", "burglar", "ring bearer", "ring bearer", "ring bearer", "ring bearer", "ring bearer", "ring bearer", "ring bearer"));
		this.repository.save(new Escritorio("Gandalf", "the Grey", "wizard", "ring bearer", "ring bearer", "ring bearer", "ring bearer", "ring bearer", "ring bearer", "ring bearer"));
		this.repository.save(new Escritorio("Samwise", "Gamgee", "gardener", "ring bearer", "ring bearer", "ring bearer", "ring bearer", "ring bearer", "ring bearer", "ring bearer"));
		this.repository.save(new Escritorio("Meriadoc", "Brandybuck", "pony rider", "ring bearer", "ring bearer", "ring bearer", "ring bearer", "ring bearer", "ring bearer", "ring bearer"));
		this.repository.save(new Escritorio("Peregrin", "Took", "pipe smoker", "ring bearer", "ring bearer", "ring bearer", "ring bearer", "ring bearer", "ring bearer", "ring bearer"));
	}
}
// end::code[]