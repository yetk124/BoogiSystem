package com.buggi.backend.dto;

public class AuthDtos {

    // 로그인 요청 body
    public record LoginRequest(String username, String password) {}

    // 로그인 응답 body (여기서는 토큰 대신 유저정보만 반환, 나중에 JWT 가능)
    public record LoginResponse(Long userId, String username, String role, String token) {}
}