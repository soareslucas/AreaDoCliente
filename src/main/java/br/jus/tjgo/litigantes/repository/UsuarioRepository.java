package br.jus.tjgo.litigantes.repository;


import br.jus.tjgo.litigantes.model.*;
import org.springframework.data.repository.Repository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;



/**
 * @author Lucas Soares
 */
@RepositoryRestResource(collectionResourceRel = "usuarios", path = "usuarios", exported = true)
public interface UsuarioRepository extends  JpaSpecificationExecutor<Cliente>, PagingAndSortingRepository<Usuario, Long> {


	Usuario save(Usuario usuario);

	Usuario findByName(String name);

}