package br.jus.tjgo.litigantes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import br.jus.tjgo.litigantes.model.*;
import br.jus.tjgo.litigantes.repository.ManagerRepository;

@Component
@RepositoryEventHandler(Escritorio.class)
public class SpringDataRestEventHandler {

	private final ManagerRepository managerRepository;
	String name = "";

	@Autowired
	public SpringDataRestEventHandler(ManagerRepository managerRepository) {
		this.managerRepository = managerRepository;
	}

	@HandleBeforeCreate
	@HandleBeforeSave
	public void applyUserInformationUsingSecurityContext(Escritorio escritorio) {

		//		String name = SecurityContextHolder.getContext().getAuthentication().getName();
		
//		this.name = "admin";
//		Manager manager = this.managerRepository.findByName(name);
//		
//		if (manager == null) {
//			Manager newManager = new Manager();
//			newManager.setName(this.name);
//			newManager.setRoles(new String[]{"ROLE_MANAGER"});
//			manager = this.managerRepository.save(newManager);
//		}
//		escritorio.setManager(manager);
		escritorio.setStatus("Solicitado");
	}
}