package br.jus.tjgo.litigantes;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestAttribute;
import br.jus.tjgo.litigantes.model.*;
import br.jus.tjgo.litigantes.repository.ManagerRepository;

@Component
@RepositoryEventHandler(Escritorio.class)
public class SpringDataRestEventHandler {

	private final ManagerRepository managerRepository;
	String name = "";
	private  HttpServletRequest request;



	@Autowired
	public SpringDataRestEventHandler(ManagerRepository managerRepository, HttpServletRequest request) {
		this.managerRepository = managerRepository;
		this.request = request;
	}

	@HandleBeforeCreate
	public void applyUserInformationUsingSecurityContext(Escritorio escritorio) {

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
		
		System.out.println("okkkkk");
		
		byte[] data = (byte[]) this.request.getSession().getAttribute("uploadedFiles");
		
		escritorio.setData(data);
		escritorio.setStatus("Solicitado");
	}
}