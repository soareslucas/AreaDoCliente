package br.jus.tjgo.litigantes.repository;


import br.jus.tjgo.litigantes.model.*;
import org.springframework.data.repository.Repository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * @author Lucas Soares
 */
@RepositoryRestResource(exported = false)
public interface ManagerRepository extends Repository<Manager, Long> {

	Manager save(Manager manager);

	Manager findByName(String name);

}