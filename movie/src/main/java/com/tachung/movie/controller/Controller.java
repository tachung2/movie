package com.tachung.movie.controller;

import org.springframework.web.bind.annotation.GetMapping;

@org.springframework.stereotype.Controller
public class Controller {

    @GetMapping("/main")
    public String main() {
        return "main";
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/register")
    public String register() {
        return "register";
    }

    @GetMapping("/search")
    public String search() {
        return "map";
    }
}
