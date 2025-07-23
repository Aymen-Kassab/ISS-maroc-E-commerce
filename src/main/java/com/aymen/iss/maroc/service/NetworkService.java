package com.aymen.iss.maroc.service;

import com.aymen.iss.maroc.model.Network;
import com.aymen.iss.maroc.repository.NetworkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NetworkService {

    @Autowired
    private NetworkRepository networkRepository;

    //Get all network
    public List<Network> getAllNetwork(){
        return networkRepository.findAll();
    }

    //Add or update a network
    public Network saveNetwork(Network network){
        return networkRepository.save(network);
    }

    //Get a network by id
    public Optional<Network> getNetworkById(long id){
        return networkRepository.findById(id);
    }

    //Delete network
    public boolean deleteNetwork(long id){
        networkRepository.deleteById(id);
        return false;
    }
}
