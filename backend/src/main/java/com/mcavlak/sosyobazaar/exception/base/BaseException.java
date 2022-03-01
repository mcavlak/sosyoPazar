package com.mcavlak.sosyobazaar.exception.base;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class BaseException extends RuntimeException {

    private final HttpStatus httpStatus;

    public BaseException(HttpStatus httpStatus, String message) {
        super(message);
        this.httpStatus = httpStatus;
    }

    public BaseException(String message) {
        super(message);
        httpStatus = (HttpStatus.BAD_REQUEST);
    }

}
