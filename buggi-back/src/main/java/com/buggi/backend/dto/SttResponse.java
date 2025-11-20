//STT 결과 텍스트

package com.buggi.backend.dto;

public class SttResponse {

    private String text;

    public SttResponse() {
    }

    public SttResponse(String text) {
        this.text = text;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
