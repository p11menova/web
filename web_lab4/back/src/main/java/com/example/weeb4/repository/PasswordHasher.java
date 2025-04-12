package com.example.weeb4.repository;

import at.favre.lib.crypto.bcrypt.BCrypt;

public class PasswordHasher {

    public static String hash(String password) {
        return BCrypt.withDefaults().hashToString(6, password.toCharArray());
    }

    public static boolean verify(String password, String hashedPassword) {
        return BCrypt.verifyer().verify(password.toCharArray(), hashedPassword).verified;
    }
}

