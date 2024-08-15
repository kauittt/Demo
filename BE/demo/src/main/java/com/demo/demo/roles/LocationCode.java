package com.demo.demo.roles;

public enum LocationCode {
    YELLOW(0),BLUE(1),GREEN(3);
    private int code;

    LocationCode(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }
}
