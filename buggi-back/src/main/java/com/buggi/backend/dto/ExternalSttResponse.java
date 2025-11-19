// src/main/java/com/buggi/backend/dto/ExternalSttResponse.java
package com.buggi.backend.dto;

public class ExternalSttResponse {

    private String text;

    public ExternalSttResponse() {
    }

    public ExternalSttResponse(String text) {
        this.text = text;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}