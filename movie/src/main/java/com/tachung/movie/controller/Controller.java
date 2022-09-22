package com.tachung.movie.controller;

import com.tachung.movie.Dto.UserDto;
import com.tachung.movie.Repository.userRepository;
import com.tachung.movie.Service.UserService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpSession;

@RequiredArgsConstructor
@org.springframework.stereotype.Controller
@RequestMapping("/user")
public class Controller {

    private final UserService userService;

    @GetMapping("/")
    public String main() {
        return "main";
    }

    @PostMapping("/signup")
    public String signup(@ModelAttribute UserDto userDto){
        userService.save(userDto);
        return "login";
    }
    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @PostMapping("/login")
    public String goLogin(@ModelAttribute UserDto userDto, HttpSession session) {
        UserDto loginResult = userService.login(userDto);
        if (loginResult != null) {
            session.setAttribute("loginEmail", loginResult.getEmail());
            session.setAttribute("id", loginResult.getId());
            session.setAttribute("name", loginResult.getName());
            return "main";
        } else {
            return "login";
        }
    }
    @GetMapping("/register")
    public String register() {
        return "register";
    }

    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/user/";
    }


    @GetMapping("/search")
    public String search() {
        return "map";
    }
}
