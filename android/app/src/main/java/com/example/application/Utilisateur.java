package com.example.application;

import android.os.Parcel;
import android.os.Parcelable;

import java.io.Serializable;

public class Utilisateur implements Serializable {

    private String id;

    public String getIdEquipe() {
        return idEquipe;
    }

    private String idEquipe;

    public String getId() {
        return id;
    }

    private String nom;
    private String prenom;
    private String mail;
    private String pass;

    public Utilisateur(String id, String idEquipe, String nom, String prenom, String mail, String pass) {
        this.nom = nom;
        this.prenom = prenom;
        this.mail = mail;
        this.pass = pass;
        this.id = id;
        this.idEquipe = idEquipe;
    }
}
