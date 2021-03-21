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
@RepositoryEventHandler(Escritorio.class)
public class SpringDataRestEventHandler {
	
	@Autowired
	private  HttpServletRequest request;
	
	//@Autowired
	//private MailService notificationService;


	@HandleBeforeCreate
	public void handleEscritorioBeforeCreate(Escritorio escritorio) {
		byte[] data = (byte[]) this.request.getSession().getAttribute("uploadedFiles");
		
		escritorio.setData(data);
		escritorio.setStatus("Solicitado");
	}
	
	
/* 	@HandleAfterCreate
    public void handleEscritorioAfterCreate(Escritorio escritorio){
        
		try {
			this.notificationService.sendEmail(escritorio);
		} catch (MailException mailException) {
			System.out.println(mailException);
		}
		
    } */
	
	
}