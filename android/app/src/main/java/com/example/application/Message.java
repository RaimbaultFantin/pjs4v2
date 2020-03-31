package com.example.application;

public class Message {

    private String idUser, prenom, texte;

    public Message(String idUser, String prenom, String texte) {
        this.idUser = idUser;
        this.prenom = prenom;
        this.texte = texte;
    }

    public String getIdUser() {
        return idUser;
    }

    public String getPrenom() {
        return prenom;
    }

    public String getTexte() {
        return texte;
    }
}
