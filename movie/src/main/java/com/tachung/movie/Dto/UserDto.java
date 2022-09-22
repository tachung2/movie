package com.tachung.movie.Dto;

import com.tachung.movie.Entity.UserEntity;
import lombok.*;

@Data
public class UserDto {
    private Long id;
    private String email;
    private String password;
    private String name;


    public static UserDto toUserDto(UserEntity userEntity) {
        UserDto userDto = new UserDto();
        userDto.setId(userEntity.getId());
        userDto.setEmail(userEntity.getEmail());
        userDto.setPassword(userEntity.getPassword());
        userDto.setName(userEntity.getName());
        return userDto;
    }
}




