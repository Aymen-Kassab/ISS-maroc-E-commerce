package com.aymen.iss.maroc.service;

import com.aymen.iss.maroc.model.Printer;
import com.aymen.iss.maroc.repository.PrinterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PrinterService {

    @Autowired

    private PrinterRepository printerRepository;

    //Get all printers
    public List<Printer> getAllPrinters(){
        return printerRepository.findAll();
    }

    //Add or update a printer
    public Printer savePrinter(Printer printer){
        return printerRepository.save(printer);
    }

    //Get a printer by Id
    public Optional<Printer> getPrinterById(long id){
        return printerRepository.findById(id);
    }

    //Delete a printer
    public boolean deletePrinter(long id){
        printerRepository.deleteById(id);
        return false;
    }
}
