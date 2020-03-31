package com.example.application;

public class SingletonUtilisateur {

    private static SingletonUtilisateur singleton;
    private final Utilisateur user;

    private SingletonUtilisateur(Utilisateur user) {
        this.user = user;
    }

    public static void initialiserSingleton(Utilisateur user) {
        if(singleton == null) {
            singleton = new SingletonUtilisateur(user);
        }
    }

    public static SingletonUtilisateur getInstance() {
        return singleton;
    }

    public Utilisateur getUser(){
        return user;
    }
}
