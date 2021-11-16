package org.goinf.model;

import java.time.LocalDate;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonFormat;

import org.springframework.data.rest.core.annotation.RestResource;

import javax.persistence.JoinColumn;


import lombok.Data;

@Data
@Entity
public class Pagamento {

	private @Id @GeneratedValue Long id;

	private String name;
    @JsonFormat(pattern="dd-MM-yyyy")
    private LocalDate data;
	private Float valor;
	private String status;

    @ManyToOne
    @JoinColumn(name="plano_id")
	private Plano plano;


    @ManyToOne
    @JoinColumn(name="cliente_id")
	private Cliente cliente;


	public Pagamento() {}

	public Pagamento(String name, LocalDate data, Float valor, String status, Plano plano, Cliente cliente) {
		this.name = name;
		this.data = data;
		this.valor = valor;
		this.status = status;
		this.plano = plano;
		this.cliente = cliente;
	}

	public Plano getPlano(){
		return this.plano;
	}

	public void setPlano(Plano plano){
		this.plano = plano;
	}
	public Cliente getCliente(){
		return this.cliente;
	}

	public void setCliente(Cliente cliente){
		this.cliente = cliente;
	}
	

}