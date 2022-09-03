package com.tachung.movie.controller;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@org.springframework.stereotype.Controller
public class Controller {

    @GetMapping("/main")
    public String main() {
        return "page/main";
    }
}
