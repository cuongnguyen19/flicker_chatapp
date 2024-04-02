package com.capstone.project.flicker.ChatApp.exception;

public class InvalidInputException extends RuntimeException {

    public InvalidInputException() {

    }

    public InvalidInputException(String msg) {
        super(msg);
    }
}
