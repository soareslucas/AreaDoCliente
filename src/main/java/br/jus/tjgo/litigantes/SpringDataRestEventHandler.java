package br.jus.tjgo.litigantes;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleAfterCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.mail.MailException;
import org.springframework.stereotype.Component;
import br.jus.tjgo.litigantes.model.*;
import br.jus.tjgo.litigantes.service.*;

@Component
@RepositoryEventHandler(Cliente.class)
public class SpringDataRestEventHandler {
	
	@Autowired
	private  HttpServletRequest request;
	
	//@Autowired
	//private MailService notificationService;


	@HandleBeforeCreate
	public void handleClienteBeforeCreate(Cliente cliente) {
		byte[] data = (byte[]) this.request.getSession().getAttribute("uploadedFiles");
		
		cliente.setData(data);
		cliente.setStatus("Solicitado");
	}
	
	
/* 	@HandleAfterCreate
    public void handleClienteAfterCreate(Cliente cliente){
        
		try {
			this.notificationService.sendEmail(cliente);
		} catch (MailException mailException) {
			System.out.println(mailException);
		}
		
    } */
	
	
}