// 질문 받는 DTO

package com.buggi.backend.dto;

public class BoogiAskRequest {

    private String question;

    public BoogiAskRequest() {
    }

    public BoogiAskRequest(String question) {
        this.question = question;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }
}
