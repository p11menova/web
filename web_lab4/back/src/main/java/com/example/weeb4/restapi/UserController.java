package com.example.weeb4.restapi;

import com.example.weeb4.repository.PasswordHasher;
import com.example.weeb4.models.User;
import com.example.weeb4.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/login")
    public List<User> getUsers() {
        return (List<User>) userRepository.findAll();
    }

    @PostMapping("/login")
    ResponseEntity<?> addUser(@RequestBody User user) {
        System.out.println("блять мне пришел запрос блять мне блять");

        if (userRepository.findByUsername(user.getUsername()).isEmpty()) {
            return ResponseEntity.
                    status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of(
                            "message", "пользователя с таким именем НЕ существует"
                    ));
        }
        User db_user = userRepository.findByUsername(user.getUsername()).get();
        System.out.println("я кое что нашел");
        System.out.println(db_user.getId() + " " + db_user.getUsername() + " " + db_user.getPassword());
        System.out.println(user.getId() + " " + user.getUsername() + " " + user.getPassword());

        user.setId(db_user.getId());
        if (!PasswordHasher.verify(user.getPassword(), db_user.getPassword())) {
            return ResponseEntity.
                    status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of(
                            "message", "эмм пароли не совпадают"
                    ));
        }

        return ResponseEntity
                .status(HttpStatus.OK)
                .build();
    }

    @PostMapping("/register")
    ResponseEntity<?> registerUser(@RequestBody User user) {

        System.out.println("счас мы будем регаться");
        if (userRepository.existsByUsername(user.getUsername())) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "нееет пользователь с таким юзернеймом уже существует"));
        }

        user.setPassword(PasswordHasher.hash(user.getPassword()));
        userRepository.save(user);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(Map.of("userId", user.getId()));
    }
}
